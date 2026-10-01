# Emilia Caro — sitio personal

Sitio estático. Sin build, sin dependencias, sin backend. Bilingüe (EN por defecto, toggle a ES).

## Sistema visual

Estructura editorial inspirada en juliaismael.com.ar, con la paleta propia. Un fondo claro, un color de autoridad (navy) y un único acento (rojo).

| token | hex | uso |
|---|---|---|
| navy | `#051926` | títulos, nav, bloques oscuros, botones |
| rojo | `#D95749` | itálicas de los títulos, filetes, subrayados de links |
| rojo oscuro | `#B8412F` | etiquetas chicas sobre fondo claro (por contraste) |
| celeste | `#AACDE0` | acento sobre navy: etiquetas, íconos, unidades de las cifras |
| lima | `#E8FCB3` | sólo la selección de texto |
| gris | `#63797F` | bajadas, fechas, texto atenuado |
| offwhite | `#F4F5F6` | fondo general |

Tipografía: **Playfair Display** (títulos; la palabra clave va en `<em>` y sale en itálica roja), **Nunito Sans** (cuerpo, etiquetas en mayúsculas con `letter-spacing` amplio, botones).


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

Hero · Mirada (la desigualdad como causa de muerte) · Áreas de trabajo · Bio + alcance (68+ países, 100+ organizaciones del consorcio de cáncer colorrectal, 15 de la alianza por la salud de la mujer) · Roles · Conferencias · Escritos y Prensa · Comunidad (Instagram) · Herramientas (abre con "La brecha, en números") · Contacto

## Cómo editar

**Publicar una nota nueva**: duplicá `writing/_plantilla.html`, escribí el texto, y agregá un `<a class="writing-item">` al principio del listado en la sección `#writing` de `index.html`. Sumá la URL a `sitemap.xml`.

**Agregar una aparición en prensa**: copiá un bloque `<a class="press-item">` en la sección `#press`. El chip de la izquierda es el nombre del medio.

**Editar el quiz**: el array `QUESTIONS` está al final de `tools/quiz.html`. Cada pregunta tiene `q`, `opts`, `correct` (índice base 0), `datum` y `src`. Mantené la respuesta correcta repartida entre A, B y C para que no se adivine por posición.

**Editar la calculadora**: las constantes `BENCH_WORK` y `BENCH_LEAD` al inicio del script de `tools/brecha.html` definen el benchmark del sector. Los textos de lectura del resultado están en `T.reads`, ordenados por brecha máxima.

## Respuestas del quiz y la calculadora (Google Sheets)

Las respuestas se guardan de forma anónima en una planilla de Google Sheets. Sin nombre, mail ni IP.

- El código de la planilla está en `integraciones/google-sheets.gs`, con las instrucciones de instalación al principio.
- La URL de la aplicación web se pega en `SHEETS_URL`, al principio de `script.js`. Si queda vacía, no se envía nada.
- **Quiz:** se guarda una fila al terminar, con el puntaje y la opción elegida en cada pregunta (✓ o ✗).
- **Calculadora:** se guarda una fila cuando la persona deja de tipear, con los cuatro números y la brecha resultante.
- Si se cambian las preguntas del quiz, actualizar los encabezados `P1`…`P8` en el script de la planilla.

## Estadísticas de visitas

Todas las páginas cargan **Vercel Web Analytics** (`/_vercel/insights/script.js`, en el `<head>`). Se ve en Vercel → proyecto → pestaña *Analytics*: visitas, visitantes únicos, páginas más leídas, origen (LinkedIn, Google…), país y dispositivo. No usa cookies ni identifica personas. Al crear una página nueva desde `writing/_plantilla.html` ya viene incluido.

## Pendientes

Las cifras se verificaron contra sus fuentes (septiembre 2026). Las oficiales (INC, INDEC, Estadísticas Vitales) coinciden; las de Infobae se reescribieron para decir exactamente lo que dice la nota. Quedan sin fuente primaria:

1. **7 a 10 años para diagnosticar endometriosis**: es una declaración propia en Infobae 2026; conviene reemplazarla por la fuente original
2. **57% (quiz, pregunta 8)**: se reformuló según la OPS (Houghton y otros, *Rev Panam Salud Publica* 2022): 56,7% de mujeres de 8 países de América Latina no consigue dinero para la consulta o el tratamiento. No es "barreras de acceso" en general
3. **USD 4,30 por dólar**: es solo para prevención del embarazo adolescente (UNFPA); así está redactado en el quiz

## Publicar

El sitio está en **Vercel**, conectado a este repositorio: todo lo que entra a `main` se publica solo en emiliacaro.com en menos de un minuto. El dominio se gestiona en GoDaddy y apunta a Vercel.

## Ver en local

```
python3 -m http.server 8000
```
y abrí `http://localhost:8000`. Hace falta servidor: abrir el `index.html` con doble clic rompe las rutas relativas de `tools/` y `writing/`.
