    var apiUrl = "/DesktopModules/ImageGallery/Components/IGAPI.ashx?igmode=JSON";
    var totalpages[moduleid] = 1;
    var galleryJSON[moduleid] = "";
    var galleryCurrentPage[moduleid] = 1;
    //this can change as people scroll through and next/previous page gets loaded
    var galleryStartPage[moduleid] = 1;
    var galleryEndPage[moduleid] = 1;
    var debug = false;
    var apiUrlRelated = "/DesktopModules/ImageGallery/Components/IGAPI.ashx?igmode=RelatedArticlesJSON";
    var chosenImgRelatedJson[moduleid] = "";
    var chosenImgRelatedItemsCount[moduleid] = 0;


    function getQueryParameters(str) {
        return (str || document.location.search).replace(/(^\?)/, '').split("&").map(function (n) { return n = n.split("="), this[n[0]] = n[1], this }.bind({}))[0];
    }

    function BuildPayloadRelated(targetImageId) {
        var payload = {};
        payload = getQueryParameters();
        for (var obj in payload) {
            payload[obj] = unescape(payload[obj]);
        }
        payload.portalId = [portalid];
        payload.moduleId = [moduleid];
        payload.igphoto = targetImageId;
        return payload;
    }


    function GalleryLoadRelated(targetImageId) {
        $.ajax({
            url: apiUrlRelated,
            data: BuildPayloadRelated(targetImageId),
            dataType: "json",
            success: function (r) {
                if (r.HadError) {
                    if (debug) {
                        console.log('GalleryLoadRelated(' + targetImageId +') success + error');
                    }
                    chosenImgRelatedItemsCount[moduleid] = r.totalresults;
                    chosenImgRelatedJson[moduleid] = r.items;
                    // asynchronous handling
                    document.dispatchEvent(new Event('gallery-load-related'));
                    event.preventDefault();
                }
                else {
                    if (debug) {
                        console.log('GalleryLoadRelated(' + targetImageId +') success ');
                    }

                    event.preventDefault();
                }
            },
            error: function (xhr, status, error) {
                if (debug) {
                    console.log('GalleryLoadRelated(' + targetImageId +') error');
                }
                event.preventDefault();
                document.dispatchEvent(new Event('gallery-load-related-error'));
                console.log(error);
            }
        });
    }


    function BuildPayloadPrev() {
        var payload = {};
        payload = getQueryParameters();
        for (var obj in payload) {
            payload[obj] = unescape(payload[obj]);
        }
        galleryStartPage[moduleid]--;
        payload.portalId = [portalid];
        payload.moduleId = [moduleid];
        payload.igpage = galleryStartPage[moduleid];
        payload.isMobile = dma.DeviceIsMobile();
        //clear the photo as we already have page item is on
        payload.igphoto = "";

        return payload;
    }

    function BuildPayloadNext() {
        var payload = {};
        payload = getQueryParameters();
        for (var obj in payload) {
            payload[obj] = unescape(payload[obj]);
        }
        galleryEndPage[moduleid]++;
        payload.portalId = [portalid];
        payload.moduleId = [moduleid];
        payload.igpage = galleryEndPage[moduleid];
        payload.isMobile = dma.DeviceIsMobile();
        //clear the photo as we already have page item is on
        payload.igphoto = "";

        return payload;
    }

    function BuildPayloadInitial() {
        var payload = {};
        payload = getQueryParameters();
        for (var obj in payload) {
            payload[obj] = unescape(payload[obj]);
        }
        payload.portalId = [portalid];
        payload.moduleId = [moduleid];
        payload.igpage = galleryCurrentPage[moduleid];
        payload.isMobile = dma.DeviceIsMobile();

        return payload;
    }

    function GalleryLoadInitialPage() {
        $.ajax({
            url: apiUrl,
            data: BuildPayloadInitial(),
            dataType: "json",
            success: function (r) {
                if (r.HadError) {
                    if (debug) {
                        console.log('GalleryLoadInitialPage() success + error');
                    }
                    event.preventDefault();
                }
                else {
                    if (debug) {
                        console.log('GalleryLoadInitialPage() success ');
                    }

                    //initial the pages to this page
                    galleryCurrentPage[moduleid] = r.pagenum;
                    galleryStartPage[moduleid] = r.pagenum;
                    galleryEndPage[moduleid] = r.pagenum;
                    totalpages[moduleid] = r.totalpages;

                    //load the json for the slideshow
                    galleryJSON[moduleid] = r.items;
                    document.dispatchEvent(new Event('gallery-load-initial-page'));
                    event.preventDefault();
                }
            },
            error: function (xhr, status, error) {
                if (debug) {
                    console.log('GalleryLoadInitialPage() error');
                }
                event.preventDefault();
                // asynchronous handling
                document.dispatchEvent(new Event('gallery-load-initial-page-error'));
                console.log(error);
            }
        });
    }

    function GalleryLoadNextPage() {
        $.ajax({
            url: apiUrl,
            data: BuildPayloadNext(),
            dataType: "json",
            success: function (r) {
                if (r.HadError) {
                    if (debug) {
                        console.log('GalleryLoadNextPage() > success + error');
                    }
                    event.preventDefault();
                }
                else {
                    if (debug) {
                        console.log('GalleryLoadNextPage() > success + append');
                    }

                    //cool code for the slideshow
                    galleryJSON[moduleid] = galleryJSON[moduleid].concat(r.items);
                    // asynchronous handling
                    document.dispatchEvent(new Event('gallery-load-next-page'));
                    event.preventDefault();
                }
            },
            error: function (xhr, status, error) {
                if (debug) {
                    console.log('GalleryLoadNextPage() > error');
                }
                event.preventDefault();
                // asynchronous handling
                document.dispatchEvent(new Event('gallery-load-next-page-error'));
                console.log(error);
            }
        });
    }

    function GalleryLoadPrevPage() {
        $.ajax({
            url: apiUrl,
            data: BuildPayloadPrev(),
            dataType: "json",
            success: function (r) {

                if (r.HadError) {
                    if (debug) {
                        console.log('GalleryLoadPrevPage() < success + error');
                    }
                    event.preventDefault();
                }
                else {
                    if (debug) {
                        console.log('GalleryLoadPrevPage() < success + append');
                    }

                    //to take the json and prepend to the galleryJSON[moduleid]
                    galleryJSON[moduleid] = r.items.concat(galleryJSON[moduleid]);
                    // asynchronous handling
                    document.dispatchEvent(new Event('gallery-load-prev-page'));
                    event.preventDefault();
                }
            },
            error: function (xhr, status, error) {
                if (debug) {
                    console.log('GalleryLoadPrevPage() < error');
                }
                event.preventDefault();
                // asynchronous handling
                document.dispatchEvent(new Event('gallery-load-prev-page-error'));
                console.log(error);
            }
        });
    }

    //note, this fetches a page worth of data (template/branch driven) and adds it to the embedded json.

    // $('#gallery-load-next').on('click', function (e) {
    //     if (galleryEndPage[moduleid] === totalpages[moduleid]) {
    //         if (debug) {
    //             console.log('click > load next page is at the end. Non-op');
    //         }
    //         //need to mark whatever as "can't load more"
    //         e.preventDefault();
    //         return;
    //     }
    //     if (debug) {
    //         console.log('click > load next page');
    //     }
    //     GalleryLoadNextPage();
    //     e.preventDefault();
    // });

    // $('#gallery-load-prev').on('click', function (e) {
    //     if (galleryStartPage[moduleid] === 1) {
    //         if (debug) {
    //             console.log('click < load previous page is at beginning. Non-op');
    //         }
    //         //need to mark things as 'cannot request more, last page already retrieved'
    //         e.preventDefault();
    //         return;
    //     }
    //     if (debug) {
    //         console.log('click < load previous page');
    //     }
    //     GalleryLoadPrevPage();
    //     e.preventDefault();
    // });

    // $(document).ready(function () {
    //     GalleryLoadInitialPage();
    // });
