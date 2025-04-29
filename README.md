# FACEOFF - NHL Team Finder

![FACEOFF Screenshot](./screenshots/main-page.png)

FACEOFF is een webapplicatie waarmee ijshockey-fans de perfecte NHL-team match kunnen vinden op basis van hun voorkeuren en interesses. Daarnaast kunnen gebruikers informatie vinden over teams, spelers, standen en uitzendschema's.

## Functionaliteiten

- **Team Finder**: Ontdek welke NHL-teams het beste bij jouw voorkeuren passen
- **Teams & Spelers zoeken**: Zoek en bekijk informatie over NHL-teams en -spelers
- **TV Gids**: Zie wanneer en waar NHL-wedstrijden worden uitgezonden
- **Standen & Statistieken**: Bekijk actuele competitiestanden en spelersstatistieken

## Benodigdheden

Om de applicatie lokaal te draaien heb je nodig:
- Node.js (versie 16.x of nieuwer)
- npm (komt standaard met Node.js)
- Een internetverbinding (voor API-toegang)
- API key voor The Sports DB (deze is reeds geconfigureerd in de applicatie)

## Installatie-instructies

1. Clone deze repository naar je lokale machine:
   ```
   git clone https://github.com/sdrjanssen/faceoff-app.git
   ```

2. Navigeer naar de projectmap:
   ```
   cd faceoff-app
   ```

3. Installeer de benodigde dependencies:
   ```
   npm install
   ```

4. Start de ontwikkelingsserver:
   ```
   npm start
   ```

5. Open je browser en ga naar http://localhost:3000

## Inloggegevens

Voor testdoeleinden kun je inloggen met de volgende gegevens:

**Gebruikersnaam:** testuser  
**Wachtwoord:** test1234

Of je kunt een nieuw account aanmaken via de registratiepagina.

## Beschikbare Scripts

In het project kun je de volgende commando's gebruiken:

- `npm start`: Start de ontwikkelingsserver
- `npm test`: Voert de tests uit
- `npm run build`: Bouwt de app voor productie naar de `build` map
- `npm run eject`: Verwijdert de single build dependency

## API Informatie

Deze applicatie maakt gebruik van:

- [The Sports DB API](https://www.thesportsdb.com/api.php) voor NHL teams, spelers en wedstrijden
- [NOVI Educational Backend](https://frontend-educational-backend.herokuapp.com/) voor authenticatie

## Technologieën

- React 19.1.0
- React Router 7.5.0
- CSS (Custom Styling, geen externe UI libraries)
- Axios voor API requests

## Project Structuur

- `/src/components` - Herbruikbare UI componenten
- `/src/pages` - Hoofdpagina's van de applicatie
- `/src/contexts` - React Context providers
- `/src/services` - API services en helpers
- `/src/assets` - Afbeeldingen en statische bestanden

## Bijdragers

- [Sam Janssen](https://github.com/sdrjanssen)

## Licentie

Dit project is gelicenseerd onder de MIT-licentie - zie het LICENSE bestand voor details.
