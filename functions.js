window.onload = () => {
    
    var tours = document.getElementById('tours');
    var elements = document.getElementsByClassName('cta');
    
    for (var e=0;e<elements.length;e++){
        
        var links = elements[e].getElementsByTagName('a');
        
        for (var l=0;l<links.length;l++){
            
            links[l].addEventListener("click", (e)=>{
                
                e.preventDefault();
                
                window.scrollTo(0, tours.offsetTop);
            });
        }
    };
    
    var items = tours.getElementsByTagName('li')
    
    for (var i=0;i<items.length;i++){
        
        items[i].addEventListener("click", (e)=>{
            
            e.preventDefault();
            
            let image = e.target.closest('li').getElementsByTagName('img')[0];
            
            document.getElementById('location').value = image.getAttribute('alt');
        });
    };

    // Challenge 1 
    var url = 'https://9ss7bxey8k.execute-api.ap-southeast-2.amazonaws.com/default/dummy_service';
    fetch (url)
    .then(res => res.json())
    .then(json => {
        console.log(json);
        for (var i=0; i< items.length; i++) {
            var img = tours.getElementsByTagName('img');
            img[i].src = json.Data[i].node.frontmatter.cover;
            
            // Challenge 3
            items[i].myImage = json.Data[i].node.frontmatter.cover;
            items[i].myExcerpt = json.Data[i].node.excerpt;
            // var module = {
            //     x: json.Data[i].node.frontmatter.cover,
            //     y: json.Data[i].node.excerpt,
            //     getX: function(){return this.x;},
            //     getY: function(){return this.y;},                
            // }
            items[i].addEventListener("click", function(e){
                e.preventDefault();
                var popup = document.querySelector('.popup');
                popup.classList.add('popup-show');
                // image and excerpt
                var popupimg = document.querySelector('.popup').getElementsByTagName('img');
                var excerpt = document.querySelector('.excerpt');
                popupimg[0].src = this.myImage;
                excerpt.innerHTML = this.myExcerpt;
                // overlay
                var overlay = document.querySelector('.overlay');
                overlay.classList.add('overlay-show');
                // Popup button event listener
                var popupbtn = document.querySelector('.btn-ok');
                popupbtn.addEventListener('click', function(){
                    popup.classList.remove('popup-show');
                    overlay.classList.remove('overlay-show');
                });
            });            

        }

    });
};

