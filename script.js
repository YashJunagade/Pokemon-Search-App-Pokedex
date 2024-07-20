document.addEventListener('DOMContentLoaded', () => {
     const searchForm = document.getElementById('search-form');
     const searchInput = document.getElementById('search-input');
     const pokemonName = document.getElementById('pokemon-name');
     const pokemonID = document.getElementById('pokemon-id');
     const spriteContainer = document.getElementById('sprite-container');
     const types = document.getElementById('types');
     const height = document.getElementById('height');
     const weight = document.getElementById('weight');
     const hp = document.getElementById('hp');
     const attack = document.getElementById('attack');
     const defense = document.getElementById('defense');
     const specialAttack = document.getElementById('special-attack');
     const specialDefense = document.getElementById('special-defense');
     const speed = document.getElementById('speed');
   
     searchForm.addEventListener('submit', async (e) => {
       e.preventDefault();
       try {
         const pokemonNameOrId = searchInput.value.toLowerCase();
         const response = await fetch(
           `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`
         );
         if (!response.ok) {
           throw new Error('Pokémon not found');
         }
         const data = await response.json();
   
         pokemonName.textContent = data.name.toUpperCase();
         pokemonID.textContent = `#${data.id}`;
         weight.textContent = `Weight: ${data.weight}`;
         height.textContent = `Height: ${data.height}`;
         spriteContainer.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">`;
   
         hp.textContent = data.stats[0].base_stat;
         attack.textContent = data.stats[1].base_stat;
         defense.textContent = data.stats[2].base_stat;
         specialAttack.textContent = data.stats[3].base_stat;
         specialDefense.textContent = data.stats[4].base_stat;
         speed.textContent = data.stats[5].base_stat;
   
         types.innerHTML = data.types.map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`).join('');
       } catch (err) {
         console.log(`Error fetching Pokémon data: ${err}`);
         resetDisplay();
         alert('Pokémon not found');
       }

       searchInput.value = "";
     });
   
     const resetDisplay = () => {
       pokemonName.textContent = '';
       pokemonID.textContent = '';
       weight.textContent = '';
       height.textContent = '';
       spriteContainer.innerHTML = '';
       hp.textContent = '';
       attack.textContent = '';
       defense.textContent = '';
       specialAttack.textContent = '';
       specialDefense.textContent = '';
       speed.textContent = '';
       types.innerHTML = '';
     };
   });