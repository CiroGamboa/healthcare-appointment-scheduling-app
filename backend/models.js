const fs = require('fs');

// Función para obtener las ranuras de tiempo desde la base de datos
function getSlotsFromDatabase() {
  const data = fs.readFileSync('db.json', 'utf8');
  return JSON.parse(data).slots;
}

// Función para obtener un paciente por su ID
function getPatientById(patientId) {
    const citas = getCitasFromDatabase();
    const cita = citas.find(cita => cita.patient && cita.patient.id === patientId);
    return cita ? cita.patient : null;
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

// Función para asignar una cita automáticamente según la prioridad
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

// Función para obtener una ranura de tiempo por su ID
function getSlotById(slotId) {
    const slots = getSlotsFromDatabase();
    return slots.find(slot => slot.id === slotId);
  }
  
module.exports = {
    getSlotById,
  getSlotsFromDatabase,
  getPatientById,
  getCitasFromDatabase,
  updateCitasInDatabase,
  assignAppointment
};
