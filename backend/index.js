const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getSlotById, assignAppointment, getCitasFromDatabase, getPatientById, getSlotsFromDatabase, updateCitasInDatabase } = require('./models');

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

// Endpoint para reservar un slot con los datos del paciente
app.post('/reserve-slot', (req, res) => {
  const { slotId, patient } = req.body;
  const success = reserveSlot(slotId, patient);

  if (success) {
    console.log("Reserved");
    res.json({ message: 'Slot reserved successfully' });
  } else {
    console.log("Not Reserved");
    res.status(400).json({ message: 'Failed to reserve slot' });
  }
});

// Endpoint para asignar una cita automáticamente según la prioridad
app.post('/assign-appointment', (req, res) => {
  const { patient } = req.body;
  const result = assignAppointment(patient);

  if (result.success) {
    console.log("Appointment assigned");
    res.json({ message: 'Appointment assigned successfully', slot: result.slot });
  } else {
    console.log("Appointment not assigned");
    res.status(400).json({ message: result.message });
  }
});

// Endpoint para obtener todas las citas agendadas
app.get('/citas', (req, res) => {
  const citas = getCitasFromDatabase();

  const citasConInformacion = citas.map(cita => {
    const slot = getSlotById(cita.slotId);
    const paciente = getPatientById(cita.patient && cita.patient.id); // Verificar si el paciente existe

    if (paciente) {
      return {
        fecha: slot.date,
        hora: slot.time,
        nombre: paciente.name,
        edad: paciente.age,
        id: paciente.id,
        tipoPaciente: paciente.type
      };
    } else {
      return null; // Opcionalmente, puedes manejar el caso en el que no haya paciente asignado a la cita
    }
  });

  // Filtrar las citas que son null
  const citasValidas = citasConInformacion.filter(cita => cita !== null);

  res.json(citasValidas);
});

// ...

// Endpoint para obtener las citas de un paciente por su ID
app.get('/patient-appointments/:patientId', (req, res) => {
  console.log("Received");
  const { patientId } = req.params;
  console.log("ID");
  console.log(patientId);
  const citas = getCitasFromDatabase().filter(cita => cita.patient.id == patientId);
  console.log(getCitasFromDatabase())

  const citasConInformacion = citas.map(cita => {
    const slot = getSlotById(cita.slotId);
    const paciente = getPatientById(cita.patient.id);

    return {
      date: slot.date,
      time: slot.time,
      patientName: paciente.name,
      patientAge: paciente.age,
      patientId: paciente.id,
      patientType: paciente.type
    };
  });

  console.log(citasConInformacion);

  res.json(citasConInformacion);
});

// ...


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
