window.addEventListener('DOMContentLoaded', function(){
    'use strrict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');
    function hideTabContent(a){
        for (let i = a; i < tabContent.length; i++){
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);
    
    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')){
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }
    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')){
            for (let i = 0; i < tab.length; i++){
                if (target == tab[i]){
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });


    //______Timer____________

    let deadline = '2019-12-31';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/1000/60/60) % 24),
            days = Math.floor(t/(1000*60*60*24));
            
            
            if (days < 10) days = "0" + days;
            if (hours < 10) hours = "0" + hours;
            if (minutes < 10) minutes = "0" + minutes;
            if (seconds < 10) seconds  = "0" + seconds;
            
        return {
            'total' : t,
            'days': days,
            'hours' : hours,
            'minutes': minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            days = timer.querySelector('.days'),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds');
            timeInterval = setInterval(updateClock, 1000);
        
            function updateClock() {
                let t = getTimeRemaining(endtime);
                    days.textContent = t.days;
                    hours.textContent = t.hours;
                    minutes.textContent = t.minutes;
                    seconds.textContent = t.seconds;
                    
                    if (t.total <= 0) {
                        clearInterval(timeInterval);
                        days.textContent = '00';
                        hours.textContent = '00';
                        minutes.textContent = '00';
                        seconds.textContent = '00';
                    }
            }
    }

    setClock('timer', deadline);
    
    //_______Modal__________

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');
    more.addEventListener('click', function(){
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });
    close.addEventListener('click', function(){
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    class Options {
        constructor(height, width, bg, fontSize, textAlign) {
            this.height = height;
            this.width = width;
            this.bg = bg;
            this.fontSize = fontSize;
            this.textAlign = textAlign;
        }
        createDiv() {
            let elem = document.createElement('div');
            document.body.appendChild(elem);
            let param = `height:${this.height}px; width:${this.width}px; background-color:${this.bg}; font-size:${this.fontSize}px; text-align:${this.textAlign}`;
            elem.style.cssText = param;
        } 
    }
    

    //____Form______

    let message = {
        loading: 'Загрузка...',
        success: 'Дякуємо, найближчим часом ми вам зателефонуємо',
        failure: 'Err...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');
        
        statusMessage.classList.add('status');

    form.addEventListener('submit', function(event){
        event.preventDefault();
        form.appendChild(statusMessage);
    
        let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        let formData = new FormData(form);
        
        let obj = {};
            formData.forEach(function(value, key){
            obj[key] = value;
            });
        
        let json = JSON.stringify(obj);
            request.send(json);
    
        request.addEventListener('readystatechange', function(){
            if (request.readyState < 4){
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            }else{
                statusMessage.innerHTML = message.failure;
            }
        });
        
        for (let i=0; i<input2.length; i++) {
            input[i].value = '';
        }
    });
    let form2 = document.getElementById('form'),
    input2 = form2.getElementsByTagName('input'),
    statusMessage2 = document.createElement('div');
    
        statusMessage2.classList.add('status');
    
    form2.addEventListener('submit', function(event){
        event.preventDefault();
        form2.appendChild(statusMessage2);

        let request2 = new XMLHttpRequest();
            request2.open('POST', 'server.php');
            request2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        let formData2 = new FormData(form2);
        
        let obj2 = {};
            formData2.forEach(function(value, key){
            obj[key] = value;
            });
        
        let json2 = JSON.stringify(obj2);
            request2.send(json2);

        request2.addEventListener('readystatechange', function(){
            if (request2.readyState < 4){
                statusMessage2.innerHTML = message.loading;
            } else if (request2.readyState === 4 && request2.status == 200) {
                statusMessage2.innerHTML = message.success;
            }else{
                statusMessage2.innerHTML = message.failure;
            }
        });
        
        for (let i=0; i<input2.length; i++) {
            input2[i].value = '';
        }
    });

    //_______slider_________
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

        showSlides(slideIndex);
    function showSlides(n){
        if (n > slides.length){
            slideIndex = 1;
        }
        if (n < 1){
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex-1].style.display = 'block';
        dots[slideIndex-1].classList.add('dot-active');
    }
    function pluseSlides(n){
        showSlides(slideIndex += n);
    }
    function currentSlide(n){
        showSlides(slideIndex = n);
    }
    prev.addEventListener('click', function(){
        pluseSlides(-1);
    });
    next.addEventListener('click', function(){
        pluseSlides(1);
    });

    dotsWrap.addEventListener('click', function(event){
        for (let i=0; i<dots.length +1; i++){
            if (event.target.classList.contains('dot') && event.target==dots[i-1]){
                currentSlide(i);
            }
        }
    });
    //___________calc______

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personSum = 0,
        daysSum = 0,
        total = 0;

        totalValue.innerHTML = 0;

        persons.addEventListener('change', function(){
            personSum += this.value;

            if (restDays.value == ''|| persons.value == ''){
                totalValue.innerHTML = 0;
                
            } else{
                totalValue.innerHTML = total;
            }
        });
        restDays.addEventListener('change', function(){
            daysSum += this.value;
            total = (daysSum + personSum)*4000;

            if (persons.value == ''|| restDays.value == ''){
                totalValue.innerHTML = 0;
                
            } else{
                totalValue.innerHTML = total;
            }
        });

        place.addEventListener('change', function(){
            if (restDays.value == ''|| persons.value == ''){
                totalValue.innerHTML = 0;
            } else {
                let a = total;
                totalValue.innerHTML = a*this.options[this.selectedIndex].value;
            }
        });

});

 
