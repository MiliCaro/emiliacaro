# Emilia Caro — sitio personal

Sitio estático. Sin build, sin dependencias, sin backend. Bilingüe (EN por defecto, toggle a ES).

## Sistema visual

Tomado del lenguaje de insight-consultora.com y adaptado.

| token | hex | uso |
|---|---|---|
| navy | `#051926` | fondo oscuro, nav, footer |
| rojo | `#D95749` | acento, subrayados, ticker |
| celeste | `#AACDE0` | secundario, curva del hero, barras |
| lima | `#E8FCB3` | botón primario, cifras destacadas |
| gris | `#63797F` | labels y texto atenuado |
| offwhite | `#F4F5F6` | fondo claro |

Tipografía: **Jost** (títulos), **Barlow** 300 (cuerpo), **Barlow Condensed** (labels, nav y botones, siempre en mayúsculas con `letter-spacing` amplio).

Todos los tokens viven en `:root` al inicio de `styles.css`. Cambiar un color ahí lo cambia en todo el sitio, incluidas las notas y las herramientas.

## Archivos

- `index.html` — home. Los dos idiomas conviven inline vía `data-en` / `data-es`
- `styles.css` — sistema visual completo, incluidos artículos y herramientas
- `script.js` — toggle de idioma, menú mobile, reveals, contador de la banda de cifras, sección activa en el nav, envío del formulario. Es compartido y null-safe: cada página usa sólo lo que tiene
- `portrait.jpg` — retrato del hero
- `writing/` — notas propias, una por archivo. `_plantilla.html` es la base para una nueva
- `tools/quiz.html` — quiz de mitos sobre salud de la mujer
- `tools/brecha.html` — calculadora de brecha de liderazgo

## Secciones de la home

`01` Bio · `02` Áreas de trabajo · `03` Posiciones · `04` Conferencias · `05` Escritos · `06` Prensa · `07` Herramientas · `08` Contacto

Más el hero, el ticker y la banda de cifras.

## Cómo editar

**Publicar una nota nueva**: duplicá `writing/_plantilla.html`, escribí el texto, y agregá un `<a class="writing-item">` al principio del listado en la sección `#writing` de `index.html`. Sumá la URL a `sitemap.xml`.

**Agregar una aparición en prensa**: copiá un bloque `<a class="press-item">` en la sección `#press`. El chip de la izquierda es el nombre del medio.

**Editar el quiz**: el array `QUESTIONS` está al final de `tools/quiz.html`. Cada pregunta tiene `q`, `opts`, `correct` (índice base 0), `datum` y `src`. Mantené la respuesta correcta repartida entre A, B y C para que no se adivine por posición.

**Editar la calculadora**: las constantes `BENCH_WORK` y `BENCH_LEAD` al inicio del script de `tools/brecha.html` definen el benchmark del sector. Los textos de lectura del resultado están en `T.reads`, ordenados por brecha máxima.

## Pendientes antes de publicar

1. **Verificar las cifras de la banda y del quiz** contra las fuentes originales. Vienen de las notas de Infobae y están marcadas con un comentario en `index.html`. Las más sensibles a citarse mal son el retorno de USD 4,30 por dólar en prevención y el 3% del PBI
2. **Bio en PDF**: el link "Descargar bio breve" en la sección `#bio` todavía apunta a `#`

## Publicar en GitHub Pages

1. Subí los archivos a la raíz del repo
2. Repo → **Settings** → **Pages**
3. *Build and deployment*: **Source: Deploy from a branch**, **Branch: `main` / `root`**, **Save**

### Dominio propio
En **Settings → Pages → Custom domain** poné `emiliacaro.com` y configurá los DNS que muestra GitHub. Se agrega un archivo `CNAME` solo.

## Ver en local

```
python3 -m http.server 8000
```
y abrí `http://localhost:8000`. Hace falta servidor: abrir el `index.html` con doble clic rompe las rutas relativas de `tools/` y `writing/`.
