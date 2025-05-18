const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');

searchBtn.addEventListener('click', async (event) => {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (!query) return;

  try {
    const response = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creatures/${query.toLowerCase()}`);

    if (!response.ok) {
      alert('Creature not found');
      clearCreatureInfo();
      return;
    }

  const creature = await response.json();
  updateCreatureInfo(creature);
  console.log('Creature:', creature);
  console.log('Types:', creature.types);
  console.log('Types container children count:', typesContainer.children.length);
  
  } catch (error) {
    alert('Creature not found');
    clearCreatureInfo();
  }
});

const clearCreatureInfo = () => {
  document.getElementById('creature-name').textContent = '';
  document.getElementById('creature-id').textContent = '';
  document.getElementById('weight').textContent = '';
  document.getElementById('height').textContent = '';
  document.getElementById('hp').textContent = '';
  document.getElementById('attack').textContent = '';
  document.getElementById('defense').textContent = '';
  document.getElementById('special-attack').textContent = '';
  document.getElementById('special-defense').textContent = '';
  document.getElementById('speed').textContent = '';
  document.getElementById('types').innerHTML = '';
}

const updateCreatureInfo = (creature) => {
  document.getElementById('creature-name').textContent = creature.name;
  document.getElementById('creature-id').textContent = `${creature.id}`;
  document.getElementById('weight').textContent = `Weight: ${creature.weight}`;
  document.getElementById('height').textContent = `Height: ${creature.height}`;
  document.getElementById('hp').textContent = creature.hp;
  document.getElementById('attack').textContent = creature.attack;
  document.getElementById('defense').textContent = creature.defense;
  document.getElementById('special-attack').textContent = creature.special_attack;
  document.getElementById('special-defense').textContent = creature.special_defense;
  document.getElementById('speed').textContent = creature.speed;

  const typesContainer = document.getElementById('types');
typesContainer.innerHTML = '';
creature.types.forEach(type => {
  const typeEl = document.createElement('div');
  typeEl.textContent = type.toUpperCase();
  typesContainer.appendChild(typeEl);
});
};


