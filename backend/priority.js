function calculatePriorityAndBookSlot(patient) {
  const slots = getSlotsFromDatabase();
  const availableSlots = slots.filter(slot => !slot.isBooked);
  
  // Filtrar slots disponibles por fecha y hora según la prioridad del paciente
  let filteredSlots;
  if (patient.type === 'Premium' && patient.age > 60) {
    // Prioridad: Super prioridad para pacientes Premium mayores de 60 años
    filteredSlots = availableSlots.filter(slot => slot.date === patient.date && slot.time === patient.time);
  } else if (patient.age > 60) {
    // Prioridad: Mayor de 60 años
    filteredSlots = availableSlots.filter(slot => slot.date === patient.date && slot.time === patient.time);
  } else if (patient.type === 'Premium') {
    // Prioridad: Premium debajo del mayor de 60 años
    filteredSlots = availableSlots.filter(slot => slot.date === patient.date);
  } else {
    // Prioridad: Normal (resto de los pacientes)
    filteredSlots = availableSlots;
  }

  if (filteredSlots.length === 0) {
    return { success: false, message: 'No available slots for the patient' };
  }

  // Ordenar los slots filtrados por fecha y hora
  filteredSlots.sort((a, b) => {
    if (a.date === b.date) {
      return a.time.localeCompare(b.time);
    }
    return a.date.localeCompare(b.date);
  });

  // Reservar el primer slot disponible
  const slotToBook = filteredSlots[0];
  slotToBook.isBooked = true;

  const cita = { slotId: slotToBook.id, patient };
  const priority = calculatePriority(patient);
  cita.priority = priority;

  const citas = getCitasFromDatabase();
  citas.enqueue(cita); // Insertar en la cola de prioridad
  updateCitasInDatabase(citas.queue);
  updateSlotsInDatabase(slots);

  return { success: true, message: 'Slot reserved successfully', slot: slotToBook };
}

module.exports = calculatePriorityAndBookSlot;
