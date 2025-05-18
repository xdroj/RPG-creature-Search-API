const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const searchForm = document.getElementById('search-form');

const handleSearch = async (event) => {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (!query) return;

  try {
    const response = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${query.toLowerCase()}`);

    if (!response.ok) {
      alert('Creature not found');
      clearCreatureInfo();
      return;
    }

  const creature = await response.json();
  console.log('API Response:', creature)
  updateCreatureInfo(creature);
  
  } catch (error) {
    alert('Creature not found');
    clearCreatureInfo();
  }
};

searchForm.addEventListener('submit', handleSearch);
searchBtn.addEventListener('click', handleSearch);

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
  if (!creature) {
    clearCreatureInfo();
    return;
  }

  document.getElementById('creature-name').textContent = creature.name.toUpperCase();
  document.getElementById('creature-id').textContent = `#${creature.id}`;
  document.getElementById('weight').textContent = creature.weight;
  document.getElementById('height').textContent = creature.height;
  
  const statElements = {
    hp: document.getElementById('hp'),
    attack: document.getElementById('attack'),
    defense: document.getElementById('defense'),
    "special-attack": document.getElementById('special-attack'),
    "special-defense": document.getElementById('special-defense'),
    speed: document.getElementById('speed'),
  }

  creature.stats.forEach(stat => {
    if (statElements[stat.name]) {
      statElements[stat.name].textContent = stat.base_stat;
    }
  });

  const typesContainer = document.getElementById('types');
typesContainer.innerHTML = '';

creature.types.forEach(type => {
  const typeEl = document.createElement('div');
  typeEl.textContent = type.name.toUpperCase();
  typeEl.classList.add('type-badge');
  typesContainer.appendChild(typeEl);
});
};
