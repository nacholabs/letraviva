# LETRAVIVA

## Abstract

Herramienta para performances de texto instantáneo en vivo. Permite crear una presentación de diapositivas en tiempo real, cada una con texto, imagen, video o sitios web.


## Controles

<kbd>Alt</kbd> + <kbd>P</kbd> = Nueva diapositiva de párrafo
<kbd>Alt</kbd> + <kbd>↵</kbd> = Nueva diapositiva de párrafo
<kbd>Alt</kbd> + <kbd>1</kbd> = Nueva diapositiva de título
<kbd>Alt</kbd> + <kbd>2</kbd> = Nueva diapositiva de subtítulo
<kbd>Alt</kbd> + <kbd>Q</kbd> = Nueva diapositiva de cita

<kbd>Alt</kbd> + <kbd>R</kbd> = Gestor/insertador de recursos (imagen/video/URL)
<kbd>Alt</kbd> + <kbd>I</kbd> = Insertar imagen/video/URL (sin interfaz)
<kbd>Esc</kbd> = Cerrar diálogos y poner cursor en diapositiva

<kbd>Alt</kbd> + <kbd>↑</kbd> = Diapositiva anterior
<kbd>Alt</kbd> + <kbd>↓</kbd> = Diapositiva siguiente
<kbd>Alt</kbd> + <kbd>⇤</kbd> = Borrar diapositiva

<kbd>Alt</kbd> + <kbd>S</kbd> = Exportar presentación
<kbd>Alt</kbd> + <kbd>O</kbd> = Abrir presentación

<kbd>Alt</kbd> + <kbd>Z</kbd> = Modo apocalipsis
<kbd>Alt</kbd> + <kbd>J</kbd> = Ejecutar diapositiva como javascript (modo livecoding)

<kbd>Alt</kbd> = <kbd>Ctrl</kbd> y <kbd>Cmd</kbd> donde lo permita


## Presentaciones y recursos

LETRAVIVA espera que todo el contenido relativo a una presentación esté en una misma carpeta. Normalmente son todas las imágenes de la presentación y un archivo index.json.

Al arrastrar imagenes a LETRAVIVA se registrarán como recursos. Se toma el nombre del archivo como etiqueta, pero esta puede editarse en el gestor de recursos (<kbd>Alt</kbd> + <kbd>R</kbd>).

Para importar videos o urls, abrir el gestor de recursos. En el campo "etiqueta" ingresar la nueva etiqueta. En el campo "url" ingresar la nueva URL. Si la URL es de YouTube, se agregará como video.

La etiqueta sirve para encontrar rápidamente un recurso en una performance en vivo. El modo "sin interfaz" (<kbd>Alt</kbd> + <kbd>I</kbd>) permite ingresar la etiqueta de manera invisible.


## Creando una nueva presentación

- Crear una carpeta para la presentación en el directorio raíz de LETRAVIVA
– Poner en esa carpeta las imágenes que se usarán para la presentación
– Abrir index.html en el navegador
- Arrastrar a LETRAVIVA las imágenes incluidas en la carpeta. LETRAVIVA pedirá la ruta: escribir el nombre de la carpeta
- Opcional: abrir el gestor de recursos (<kbd>Alt</kbd> + <kbd>R</kbd>) y etiquetar las imágenes.
- Opcional: agregar videos o URLs al gestor.
- Opcional: crear diapositivas. Las diapositivas creadas al momento de exportar son guardadas y recuperadas automáticamente al abrir la presentación.
- Exportar presentación (<kbd>Alt</kbd> + <kbd>S</kbd>). Guardar el código que muestra LETRAVIVA en un archivo index.json adentro de la carpeta con las imágenes.
- Abrir presentación (<kbd>Alt</kbd> + <kbd>O</kbd>). Simplemente ingresar el nombre de la carpeta.


## Deshabilitar seguridad de Chrome

Workaround vergonzoso de momento: para abrir presentaciones hace falta abrir chrome con --disable-web-security. O LETRAVIVA en un servidor local.

Windows:
chrome.exe --disable-web-security

Mac:
open /Applications/Google\ Chrome.app/ --args --disable-web-security


## Gestión avanzada

Para reordenar diapositivas, o reordenar/eliminar recursos, editar manualmente index.json y recargar LETRAVIVA.


## Personalización

Se pueden realizar ajustes de diseño (tipografía, colores, tamaños…) modificando custom.css.