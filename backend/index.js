const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Ruta para obtener todas las ranuras de tiempo
app.post('/slots', (req, res) => {
  const { date } = req.body;
  const slots = getSlotsFromDatabase().filter(slot => slot.date === date);
  res.json(slots);
});

// Función para obtener las ranuras de tiempo desde la base de datos
function getSlotsFromDatabase() {
  const data = fs.readFileSync('db.json', 'utf8');
  return JSON.parse(data).slots;
}

// Endpoint para reservar un slot con los datos del paciente
app.post('/reserve-slot', (req, res) => {
  const { slotId, patient } = req.body;
  const success = reserveSlot(slotId, patient);

  if (success) {
    console.log("Reserved")
    res.json({ message: 'Slot reserved successfully' });
  } else {
    console.log("Not Reserved")
    res.status(400).json({ message: 'Failed to reserve slot' });
  }
});


function reserveSlot(slotId, patient) {
  const slots = getSlotsFromDatabase();
  const slot = slots.find(slot => slot.id === slotId);
  console.log(slotId)
  console.log(patient);
  if (slot && !slot.isBooked) {
    slot.isBooked = true;
    const cita = { slotId, patient };
    
    const citas = getCitasFromDatabase();
    citas.push(cita);
    updateCitasInDatabase(citas);
    updateSlotsInDatabase(slots);
    return true;
  }

  return false;
}

// Función para actualizar las ranuras en la base de datos (db.json)
function updateSlotsInDatabase(slots) {
  const data = { slots, citas: getCitasFromDatabase() };
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2), 'utf8');
}

function getCitasFromDatabase() {
  const data = fs.readFileSync('db.json', 'utf8');
  return JSON.parse(data).citas || [];
}

// Función para actualizar las citas en la base de datos (db.json)
function updateCitasInDatabase(citas) {
  const data = { slots: getSlotsFromDatabase(), citas };
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2), 'utf8');
}

// ...

// Endpoint para obtener las citas de un paciente por su ID
app.get('/patient-appointments/:patientId', (req, res) => {
  const { patientId } = req.params;
  const appointments = getAppointmentsByPatientId(patientId);
  res.json(appointments);
});

function getAppointmentsByPatientId(patientId) {
  const data = fs.readFileSync('db.json', 'utf8');
  const citas = JSON.parse(data).citas || [];
  const appointments = citas.filter(cita => cita.patient.id === patientId);
  return appointments.map(appointment => {
    const slot = getSlotById(appointment.slotId);
    return {
      date: slot.date,
      time: slot.time,
      patientName: appointment.patient.name,
      patientAge: appointment.patient.age,
      patientId: appointment.patient.id,
      patientType: appointment.patient.type
    };
  });
}

function getSlotById(slotId) {
  const data = fs.readFileSync('db.json', 'utf8');
  const slots = JSON.parse(data).slots || [];
  return slots.find(slot => slot.id === slotId);
}


// Función para obtener las citas de la base de datos
function getCitasFromDatabase() {
  const data = fs.readFileSync('db.json', 'utf8');
  return JSON.parse(data).citas || [];
}

// Función para actualizar las citas en la base de datos (db.json)
function updateCitasInDatabase(citas) {
  const data = { slots: getSlotsFromDatabase(), citas };
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2), 'utf8');
}

// Función para calcular la prioridad del paciente
function calculatePriority(patient) {
  if (patient.type === 'Premium' && patient.age > 60) {
    return 'Super Prioridad';
  } else if (patient.age > 60) {
    return 'Prioridad';
  } else if (patient.type === 'Premium') {
    return 'Premium Debajo de 60';
  } else {
    return 'Normal';
  }
}

// Función para asignar una cita automáticamente según la prioridad
// Función para asignar la cita por prioridad
function assignAppointment(patient) {
  const slots = getSlotsFromDatabase();
  const availableSlots = slots.filter(slot => !slot.isBooked);
  const sortedSlots = availableSlots.sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time));

  if (sortedSlots.length === 0) {
    return { success: false, message: 'No available slots' };
  }

  const slot = sortedSlots[0];
  slot.isBooked = true;
  const cita = { slotId: slot.id, patient };
  const citas = getCitasFromDatabase();
  citas.push(cita);
  updateCitasInDatabase(citas);
  updateSlotsInDatabase(slots);

  return { success: true, slot };
}


app.post('/reserve-basic', (req, res) => {
  const { patient } = req.body;
  const result = assignAppointment(patient);

  if (result.success) {
    console.log("Appointment assigned")
    res.json({ message: 'Appointment assigned successfully', slot: result.slot });
  } else {
    console.log("Appointment not assigned")
    res.status(400).json({ message: result.message });
  }
});

// Endpoint para obtener todas las citas agendadas
app.get('/citas', (req, res) => {
  const citas = getCitasFromDatabase();

  const citasConInformacion = citas.map(cita => {
    const slot = getSlotById(cita.slotId);
    const paciente = getPatientById(cita.patientId);

    return {
      fecha: slot.date,
      hora: slot.time,
      nombre: paciente.name,
      edad: paciente.age,
      id: paciente.id,
      tipoPaciente: paciente.type
    };
  });

  res.json(citasConInformacion);
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
