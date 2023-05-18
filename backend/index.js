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
  const data = fs.readFileSync('db.json');
  return JSON.parse(data).slots;
}

// Endpoint para reservar una ranura
app.post('/reserve-slot', (req, res) => {
  const { slotId } = req.body;
  const success = reserveSlot(slotId);

  if (success) {
    res.json({ message: 'Slot reserved successfully' });
  } else {
    res.status(400).json({ message: 'Failed to reserve slot' });
  }
});

// Función para reservar una ranura
function reserveSlot(slotId) {
  const slots = getSlotsFromDatabase();
  const slot = slots.find(slot => slot.id === slotId);

  if (slot && !slot.isBooked) {
    slot.isBooked = true;
    updateSlotsInDatabase(slots);
    return true;
  }

  return false;
}

// Función para actualizar las ranuras en la base de datos (db.json)
function updateSlotsInDatabase(slots) {
  const data = { slots };
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
