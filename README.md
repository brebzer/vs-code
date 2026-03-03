# Bryan nalty 

## Front End Web Development - Project Submission


### Github-pages
[`https://brebzer.github.io/vs-code/`](https://brebzer.github.io/vs-code/)


### Github-repo
[https://github.com/brebzer/vs-code](https://github.com/brebzer/vs-code)

### Video recording



### Site Description

This site is designed to showcase the world building,  characters and  world of a novel series I am currently writing. The images shown are AI generated in order give a general idea of how these characters look. 

In practise, this site will consist 6 pages. The home/index page and about us pages are simple layouts. The four pages from the headers Nav menu will each showcase a different feature.

I will outline these here:

___

### Characters 
>This page will display a flexible gallery of promient characters, when hovered over the image will fade and display the name of the character.
this is done through the use of the below CSS and Bootstrap:

```css 

.container {
  position: relative;
  width: 250px;
  border-radius: 10px;
  overflow: hidden;
}

.image {
  width: 100%;
  height: auto;
  display: block;
}

.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(47, 48, 48, 0.9);
  opacity: 0;
  transition: 0.4s ease;
}

.container:hover .overlay {
  opacity: 1;
}

.text {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
```

The end result should look similar to this outline:
![sitemap](https://raw.githubusercontent.com/brebzer/vs-code/refs/heads/main/sitemaps/characters-wireframe.png)

___

### Locations
Locations is designed around an embedded map image i designed that is stored in my own Google Drive. I made this image public and then added a set of five buttons with the names of different regions in the map and a section of text for each location. 

This description also includes a dynamic temperature reading that updates and changews based on various real life locations, this was done through the use of JS to pull live weather data from this api: https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true

I then used javascript to zoom into a specific location  on the map and display the corresponding text when a button is click, when its clicked again it will reset to its default position and the test will disappear.

This is a copy of the JS:

```js
const buttons = document.querySelectorAll("button[data-target]");
const locations = document.querySelectorAll(".location");
const iframe = document.getElementById("mapFrame");


const zoomClasses = [
    "zoom-center",
    "zoom-suren",
    "zoom-nevina",
    "zoom-hileon",
    "zoom-astereen",
    "zoom-gurog"
];

let activeTarget = null;

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.dataset.target;

        // SECOND CLICK → reset everything
        if (activeTarget === target) {
            locations.forEach(loc => loc.style.display = "none");
            iframe.classList.remove(...zoomClasses);
            iframe.classList.add("zoom-center");
            activeTarget = null;
            return;
        }

        // FIRST CLICK → zoom to location
        activeTarget = target;

        locations.forEach(loc => loc.style.display = "none");
        document.getElementById(`${target}-location`).style.display = "block";

        iframe.classList.remove(...zoomClasses);
        iframe.classList.add(`zoom-${target.toLowerCase()}`);
    });
});
//  Weather Script
document.addEventListener("DOMContentLoaded", () => {
  loadWeather(82.8628, 135.0000, "Suren-weather");   // Suren
  loadWeather(53.3498, -6.2603, "Nevina-weather");   // Nevina
  loadWeather(23.4162, 25.6628, "Hileon-weather");      // Hileon
  loadWeather(41.8967, 12.4822, "Gurog-weather");      // Gurog
  loadWeather(3.4653, 62.2159, "Astereen-weather");      // Astereen
});

async function loadWeather(latitude, longitude, elementId) {
  const weatherElement = document.getElementById(elementId);

  if (!weatherElement) return;

  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.current_weather) {
      throw new Error("Weather data not available.");
    }

    const temperature = data.current_weather.temperature;

    weatherElement.textContent = `${temperature}°C`;

  } catch (error) {
    weatherElement.textContent = "Unable to load.";
    console.error(error);
  }
}
```
The end result should look similar to this outline:
![sitemap](https://raw.githubusercontent.com/brebzer/vs-code/refs/heads/main/sitemaps/Locations-wireframe.png)

___

### Races

This page is designed to be a slide show of five images showing with a little title for each over the image. When the icons to the left ands right are clicked they will cycled through the images.

This was mostly done using the Bootstrap carousel function. https://getbootstrap.com/docs/4.0/components/carousel/

The end result should look similar to this outline:
![sitemap](https://raw.githubusercontent.com/brebzer/vs-code/refs/heads/main/sitemaps/Races-wireframe.png)

___

###  Timeline

>This page is designed to work as a group of drop down options, each is a list of events through the history of my books series in a timeline, and are split up into "Eras"
This works by having all the Timelines hidden until the corresponfing era box is clicked. ahsn when clicked a second time it again hides the timeline

>This was a particularly tough page to work on when it came to converting to Astro, the Layout.asto file had conflicting css that changed how the timeline looked. In order to get around this, i added the header to the timeline.astro file wihtout the layout.astro being linked and added the css directly to that element

>this is the jas for this page:  

```js
 <script>
document.querySelectorAll(".era-header").forEach(header => {
    header.addEventListener("click", () => {
      const era = header.closest(".era");
      const isOpen = era.classList.contains("open");

      era.classList.toggle("open");

      if (!isOpen) {
        setTimeout(() => {
          era.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }, 200);
      }
    });
  });
</script>
```

The end result should look similar to this outline:
![sitemap](https://raw.githubusercontent.com/brebzer/vs-code/refs/heads/main/sitemaps/timeline-wireframe.png)

___







### Deply Astro site to Github Pages
[https://docs.astro.build/en/guides/deploy/github/](https://docs.astro.build/en/guides/deploy/github/)




