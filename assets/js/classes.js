class Dropbox {
    constructor(dropbox, dropHandler) {
        this.dropbox = dropbox;
        this.dropHandler = dropHandler;
        this.setUp();
    }

    dragenter(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    dragover(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    drop(e) {
        e.stopPropagation();
        e.preventDefault();

        const dt = e.dataTransfer;
        const files = dt.files;

        this.dropHandler(files[0]);
    }

    setUp() {
        this.dropbox.addEventListener("dragenter", this.dragenter, false);
        this.dropbox.addEventListener("dragover", this.dragover, false);
        this.dropbox.addEventListener("drop", this.drop, false);
    }
}