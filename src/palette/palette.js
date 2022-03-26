const chooseNewColorFromPalette = (e) => {
    document.body.style.backgroundColor = e.target.value;
}

document.addEventListener('DOMContentLoaded', () => {
    const palette = document.querySelector('.color_picker_input');

    document.body.style.backgroundColor = palette.value;

    palette.addEventListener('change', chooseNewColorFromPalette);
});