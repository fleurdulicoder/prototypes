// JavaScript source code
$(document).ready(function(){

// Store photo gallery meta data in JSON that can be parsed to show metadata on the photo.

        var photoData = '[{"currentCarouselPosition":"1", "photoId":"1", "photoTitle":"FROZEN FIGHTER", "photoBy":"Photo by Staff Sgt. Arthur Shvartberg", "photoURL":"assets/img/marinesTV/mt1_z.jpg"},'
        photoData += '{"currentCarouselPosition":"2", "photoId":"2","photoTitle":"Where`s Waldo?","photoBy":"Photo by Staff Cpl. Josheph Jacob", "photoURL":"assets/img/marinesTV/mt2_z.jpg"},'
        photoData += '{"currentCarouselPosition":"3", "photoId":"3","photoTitle":"Up Against The Wall","photoBy":"Photo by Cpl. Josheph Jacob", "photoURL":"assets/img/marinesTV/mt3_z.jpg"},'
        photoData += '{"currentCarouselPosition":"4", "photoId":"4","photoTitle":"If it Ain`t Rainin`, We Ain`t Training","photoBy":"Photo by SSgt. Marchin Platek", "photoURL":"assets/img/marinesTV/mt4_z.jpg"},'
        photoData += '{"currentCarouselPosition":"5", "photoId":"5","photoTitle":"Through My Eyes","photoBy":"Sgt. Aaron S. Patterson", "photoURL":"assets/img/marinesTV/mt5_z.jpg"},'
        photoData += '{"currentCarouselPosition":"6", "photoId":"6","photoTitle":"We remember","photoBy":"Marines", "photoURL":"assets/img/marinesTV/mt6_z.jpg"},'
        photoData += '{"currentCarouselPosition":"7", "photoId":"7","photoTitle":"Blast Off","photoBy":"U.S. Marine Corps photo by Cpl. Timothy Valero", "photoURL":"assets/img/marinesTV/mt7_z.jpg"},'
        photoData += '{"currentCarouselPosition":"8", "photoId":"8","photoTitle":"Smokin Shots","photoBy":"U.S. Marine Corps photo by Sgt. Aaron S. Patterson", "photoURL":"assets/img/marinesTV/mt8_z.jpg"},'
        photoData += '{"currentCarouselPosition":"0", "photoId":"0","photoTitle":"Snow Shot","photoBy":"U.S. Marine Corps photo by Lance Cpl. Tanner Seims", "photoURL":"assets/img/marinesTV/mt0_z.jpg"}]';

        var obj = JSON.parse(photoData);
        var maxSlides = "8";
        var photoGalleryViewURL_left = 'assets/img/marinesTV/mt';
        var photoGalleryViewURL_right = '_z.jpg';
        var photoGalleryViewURL = '';
        var photoGalleryItemURL = '';
        var singleIncrementor = 0;
        var doubleIncrementor = 2;

        $(".photoGalleryAnchorCls").click(function(){
            //Slide to next item
            var currentItemID = $(this).attr('id');
            //Take right most character
            var currentItemNumber = parseInt(currentItemID[currentItemID.length-1]);
            var tmpCntr = 0;

            if (currentItemNumber == 1) {
                $.each(obj, function(objCntr, $val) {
//                        alert ($val.currentCarouselPosition);
                        if ($val.currentCarouselPosition == "0") {
                            $val.currentCarouselPosition = "800"
                        }

                        if ($val.currentCarouselPosition == "1") {
                            $val.currentCarouselPosition = "900"
                        }

                        if (parseInt($val.currentCarouselPosition) > 1 && parseInt($val.currentCarouselPosition) < 9) {
                            tmpCntr = parseInt($val.currentCarouselPosition);
                            tmpCntr = tmpCntr - 1;
                            $val.currentCarouselPosition = (tmpCntr).toString()
                        }
                        if ($val.currentCarouselPosition == "800") {
                            $val.currentCarouselPosition = "8"
                        }
                        if ($val.currentCarouselPosition == "900") {
                            $val.currentCarouselPosition = "0"
                        }

                });
                fillCarousel ()
                return false;
            }

            if (currentItemNumber == 2) {
                $.each(obj, function(objCntr, $val) {
                        if ($val.currentCarouselPosition == "0") {
                            $val.currentCarouselPosition = "700"
                        }
                        if ($val.currentCarouselPosition == "1") {
                            $val.currentCarouselPosition = "800"
                        }
                        if ($val.currentCarouselPosition == "2") {
                            $val.currentCarouselPosition = "900"
                        }
                        if (parseInt($val.currentCarouselPosition) > 2 && parseInt($val.currentCarouselPosition) < 9) {
                            tmpCntr = parseInt($val.currentCarouselPosition);
                            tmpCntr = tmpCntr - 2;
                            $val.currentCarouselPosition = (tmpCntr).toString()
                        }

                        if ($val.currentCarouselPosition == "700") {
                            $val.currentCarouselPosition = "7"
                        }

                        if ($val.currentCarouselPosition == "800") {
                            $val.currentCarouselPosition = "8"
                        }
                        if ($val.currentCarouselPosition == "900") {
                            $val.currentCarouselPosition = "0"
                        }
                });


                fillCarousel ()
                return false;
            }

            if (currentItemNumber == 3) {
                $.each(obj, function(objCntr, $val) {
                        if ($val.currentCarouselPosition == "0") {
                            $val.currentCarouselPosition = "600"
                        }
                        if ($val.currentCarouselPosition == "1") {
                            $val.currentCarouselPosition = "700"
                        }
                        if ($val.currentCarouselPosition == "2") {
                            $val.currentCarouselPosition = "800"
                        }
                        if ($val.currentCarouselPosition == "3") {
                            $val.currentCarouselPosition = "900"
                        }
                        if (parseInt($val.currentCarouselPosition) > 3 && parseInt($val.currentCarouselPosition) < 9) {
                            tmpCntr = parseInt($val.currentCarouselPosition);
                            tmpCntr = tmpCntr - 3;
                            $val.currentCarouselPosition = (tmpCntr).toString()
                        }

                        if ($val.currentCarouselPosition == "600") {
                            $val.currentCarouselPosition = "6"
                        }

                        if ($val.currentCarouselPosition == "700") {
                            $val.currentCarouselPosition = "7"
                        }

                        if ($val.currentCarouselPosition == "800") {
                            $val.currentCarouselPosition = "8"
                        }
                        if ($val.currentCarouselPosition == "900") {
                            $val.currentCarouselPosition = "0"
                        }
                });


                fillCarousel ()
                return false;
            }

            if (currentItemNumber == 4) {
                $.each(obj, function(objCntr, $val) {
                        if ($val.currentCarouselPosition == "0") {
                            $val.currentCarouselPosition = "500"
                        }
                        if ($val.currentCarouselPosition == "1") {
                            $val.currentCarouselPosition = "600"
                        }
                        if ($val.currentCarouselPosition == "2") {
                            $val.currentCarouselPosition = "700"
                        }
                        if ($val.currentCarouselPosition == "3") {
                            $val.currentCarouselPosition = "800"
                        }
                        if ($val.currentCarouselPosition == "4") {
                            $val.currentCarouselPosition = "900"
                        }
                        if (parseInt($val.currentCarouselPosition) > 4 && parseInt($val.currentCarouselPosition) < 9) {
                            tmpCntr = parseInt($val.currentCarouselPosition);
                            tmpCntr = tmpCntr - 4;
                            $val.currentCarouselPosition = (tmpCntr).toString()
                        }

                        if ($val.currentCarouselPosition == "500") {
                            $val.currentCarouselPosition = "5"
                        }
                        if ($val.currentCarouselPosition == "600") {
                            $val.currentCarouselPosition = "6"
                        }

                        if ($val.currentCarouselPosition == "700") {
                            $val.currentCarouselPosition = "7"
                        }

                        if ($val.currentCarouselPosition == "800") {
                            $val.currentCarouselPosition = "8"
                        }
                        if ($val.currentCarouselPosition == "900") {
                            $val.currentCarouselPosition = "0"
                        }
                });


                fillCarousel ()
                return false;
            }

            if (currentItemNumber == 5) {
                $.each(obj, function(objCntr, $val) {
                        if ($val.currentCarouselPosition == "0") {
                            $val.currentCarouselPosition = "400"
                        }
                        if ($val.currentCarouselPosition == "1") {
                            $val.currentCarouselPosition = "500"
                        }
                        if ($val.currentCarouselPosition == "2") {
                            $val.currentCarouselPosition = "600"
                        }
                        if ($val.currentCarouselPosition == "3") {
                            $val.currentCarouselPosition = "700"
                        }
                        if ($val.currentCarouselPosition == "4") {
                            $val.currentCarouselPosition = "800"
                        }
                        if ($val.currentCarouselPosition == "5") {
                            $val.currentCarouselPosition = "900"
                        }

                    if (parseInt($val.currentCarouselPosition) > 5 && parseInt($val.currentCarouselPosition) < 9) {
                            tmpCntr = parseInt($val.currentCarouselPosition);
                            tmpCntr = tmpCntr - 5;
                            $val.currentCarouselPosition = (tmpCntr).toString()
                        }

                        if ($val.currentCarouselPosition == "400") {
                            $val.currentCarouselPosition = "4"
                        }
                        if ($val.currentCarouselPosition == "500") {
                            $val.currentCarouselPosition = "5"
                        }
                        if ($val.currentCarouselPosition == "600") {
                            $val.currentCarouselPosition = "6"
                        }

                        if ($val.currentCarouselPosition == "700") {
                            $val.currentCarouselPosition = "7"
                        }

                        if ($val.currentCarouselPosition == "800") {
                            $val.currentCarouselPosition = "8"
                        }
                        if ($val.currentCarouselPosition == "900") {
                            $val.currentCarouselPosition = "0"
                        }
                });


                fillCarousel ()
                return false;
            }

            if (currentItemNumber == 6) {
                $.each(obj, function(objCntr, $val) {
                        if ($val.currentCarouselPosition == "0") {
                            $val.currentCarouselPosition = "300"
                        }
                        if ($val.currentCarouselPosition == "1") {
                            $val.currentCarouselPosition = "400"
                        }
                        if ($val.currentCarouselPosition == "2") {
                            $val.currentCarouselPosition = "500"
                        }
                        if ($val.currentCarouselPosition == "3") {
                            $val.currentCarouselPosition = "600"
                        }
                        if ($val.currentCarouselPosition == "4") {
                            $val.currentCarouselPosition = "700"
                        }
                        if ($val.currentCarouselPosition == "5") {
                            $val.currentCarouselPosition = "800"
                        }
                        if ($val.currentCarouselPosition == "6") {
                            $val.currentCarouselPosition = "900"
                        }

                    if (parseInt($val.currentCarouselPosition) > 6 && parseInt($val.currentCarouselPosition) < 9) {
                            tmpCntr = parseInt($val.currentCarouselPosition);
                            tmpCntr = tmpCntr - 6;
                            $val.currentCarouselPosition = (tmpCntr).toString()
                        }
                        if ($val.currentCarouselPosition == "300") {
                            $val.currentCarouselPosition = "3"
                        }
                        if ($val.currentCarouselPosition == "400") {
                            $val.currentCarouselPosition = "4"
                        }
                        if ($val.currentCarouselPosition == "500") {
                            $val.currentCarouselPosition = "5"
                        }
                        if ($val.currentCarouselPosition == "600") {
                            $val.currentCarouselPosition = "6"
                        }
                        if ($val.currentCarouselPosition == "700") {
                            $val.currentCarouselPosition = "7"
                        }
                        if ($val.currentCarouselPosition == "800") {
                            $val.currentCarouselPosition = "8"
                        }
                        if ($val.currentCarouselPosition == "900") {
                            $val.currentCarouselPosition = "0"
                        }
                });


                fillCarousel ()
                return false;
            }

            if (currentItemNumber == 7) {
                $.each(obj, function(objCntr, $val) {
                        if ($val.currentCarouselPosition == "0") {
                            $val.currentCarouselPosition = "200"
                        }
                        if ($val.currentCarouselPosition == "1") {
                            $val.currentCarouselPosition = "300"
                        }
                        if ($val.currentCarouselPosition == "2") {
                            $val.currentCarouselPosition = "400"
                        }
                        if ($val.currentCarouselPosition == "3") {
                            $val.currentCarouselPosition = "500"
                        }
                        if ($val.currentCarouselPosition == "4") {
                            $val.currentCarouselPosition = "600"
                        }
                        if ($val.currentCarouselPosition == "5") {
                            $val.currentCarouselPosition = "700"
                        }
                        if ($val.currentCarouselPosition == "6") {
                            $val.currentCarouselPosition = "800"
                        }
                        if ($val.currentCarouselPosition == "7") {
                            $val.currentCarouselPosition = "900"
                        }

                    if (parseInt($val.currentCarouselPosition) > 7 && parseInt($val.currentCarouselPosition) < 9) {
                            tmpCntr = parseInt($val.currentCarouselPosition);
                            tmpCntr = tmpCntr - 7;
                            $val.currentCarouselPosition = (tmpCntr).toString()
                        }
                        if ($val.currentCarouselPosition == "200") {
                            $val.currentCarouselPosition = "2"
                        }
                        if ($val.currentCarouselPosition == "300") {
                            $val.currentCarouselPosition = "3"
                        }
                        if ($val.currentCarouselPosition == "400") {
                            $val.currentCarouselPosition = "4"
                        }
                        if ($val.currentCarouselPosition == "500") {
                            $val.currentCarouselPosition = "5"
                        }
                        if ($val.currentCarouselPosition == "600") {
                            $val.currentCarouselPosition = "6"
                        }
                        if ($val.currentCarouselPosition == "700") {
                            $val.currentCarouselPosition = "7"
                        }
                        if ($val.currentCarouselPosition == "800") {
                            $val.currentCarouselPosition = "8"
                        }
                        if ($val.currentCarouselPosition == "900") {
                            $val.currentCarouselPosition = "0"
                        }
                });


                fillCarousel ()
                return false;
            }
        });

        function fillCarousel() {
            var myJSON, objText;

            //Storing data:
            myJSON = JSON.stringify(obj);
            localStorage.setItem("carouselJSON", myJSON);

            //Retrieving data:
            objText = localStorage.getItem("carouselJSON");
//            console.log (objText);
//            SET GALLERY VIEW IMAGE. LOOP THRU THE JSON OBJECT AND FIND ITEM WITH 0 POSITION
            $.each(obj, function(objCntr, $val) {
                if ($val.currentCarouselPosition == "0") {
                    document.getElementById("photoGalleryView").style.backgroundImage = "url('" + $val.photoURL + "')";
                    document.getElementById("pCaption").innerHTML = $val.photoTitle;
                    document.getElementById("pDscr").innerHTML = $val.photoBy;
                    document.getElementById("pDownload").href = $val.photoURL;
                    document.getElementById("pLink").href = 'photos_details.html';
                    return false;
                }
            });

//            SET CAROUSEL IMAGES WITH NEW JSON. FOR EACH IMAGE ITEM, LOOP THRU THE JSON OBJECT AND FIND CORRESPONDING POSITION OF THE IMAGE URL FOR THE CAROUSEL
            for (slideCntr = 1; slideCntr <= maxSlides; slideCntr++) {
                $.each(obj, function(objCntr, $val) {
                    if ($val.currentCarouselPosition == (slideCntr).toString() ) {
                        document.getElementById("photoGalleryImg" + slideCntr).style.backgroundImage  = "url('" + $val.photoURL + "')";
                        return false;
                    }
                });
            }
//            NPB: commenting this line because the carousel slides a lot
//            $("#explore-gallery-slider").carousel(0);


        }
    });
      
