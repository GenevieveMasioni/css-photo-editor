window.onload = () => {
    const siteContent = document.querySelector('#site-content');

    function fitContentToScreen() {
        if(document.body.clientWidth > 1000) {
            siteContent.style.height = `${window.screen.height}px`;
        }
    }

    const fileUploadInput = document.querySelector('#file-upload-input');
    const photo = document.querySelector('#photo');
    const photoCanvas = document.querySelector('#photo-canvas');
    const filterInputGrayscale = document.querySelector('#filter-grayscale');
    const filterInputBrightness = document.querySelector('#filter-brightness');
    const filterInputContrast = document.querySelector('#filter-contrast');
    const filterInputHueRotate = document.querySelector('#filter-hue-rotate');
    const filterInputSaturation = document.querySelector('#filter-saturation');
    const filterInputSepia = document.querySelector('#filter-sepia');
    const downloadButton = document.querySelector('#download-button');
    const downloadButtonLink = document.querySelector('#download-button-link');


    function applyFiltersToPhoto() {
        if(!photo) return;
        const context = photoCanvas.getContext('2d');
        const filterString = `grayscale(${filterInputGrayscale.value}%) 
                            brightness(${filterInputBrightness.value}%)
                            contrast(${filterInputContrast.value}%)
                            hue-rotate(${filterInputHueRotate.value}deg)
                            saturate(${filterInputSaturation.value}%)
                            sepia(${filterInputSepia.value}%)`;
        context.filter = filterString;
        addPhotoToCanvas();
        updateDownloadLink();
    }

    function loadPhoto(file) {
        if(!file) return;
        photo.file = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            photo.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function addPhotoToCanvas() {
        photoCanvas.width = photo.naturalWidth;
        photoCanvas.height = photo.naturalHeight;
        const context = photoCanvas.getContext('2d');
        context.reset();
        context.drawImage(photo, 0, 0, photo.naturalWidth, photo.naturalHeight);
    }

    function updateDownloadLink() {
        photoCanvas.toBlob((blob) => {
            const downloadUrl = URL.createObjectURL(blob);
            downloadButtonLink.href = downloadUrl;
        });
    }

    function setEventListeners() {
        fileUploadInput.addEventListener('change', loadPhoto(fileUploadInput.files[0]), false);

        photo.addEventListener('load', addPhotoToCanvas, false);

        filterInputGrayscale.addEventListener('change', applyFiltersToPhoto);
        
        filterInputBrightness.addEventListener('change', applyFiltersToPhoto);

        filterInputContrast.addEventListener('change', applyFiltersToPhoto);

        filterInputHueRotate.addEventListener('change', applyFiltersToPhoto);

        filterInputSaturation.addEventListener('change', applyFiltersToPhoto);

        filterInputSepia.addEventListener('change', applyFiltersToPhoto);

    }
    
    fitContentToScreen();
    new Dropbox(document.querySelector("#dropbox"), loadPhoto);
    setEventListeners();
}