onload = function() {
    /* прописываем игру найди пару*/
  function set(codes) {                                       
    var codes = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8],
      i, j, x, y;

    /* создаем новый массив codes 
       со случайными индексами     */

    for (y = codes.length; y;) {
      j = Math.floor(Math.random() * y);
      x = codes[--y];
      codes[y] = codes[j];
      codes[j] = x;
    }

    /* Отрисовывем div id = pole сетку 4 на 4 */

    for (j = 0; j < 16; j++) document.getElementById('pole').innerHTML += '<a color="' + codes[j] + '" class="color' + codes[j] + ' hidden">&nbsp;</a>';
    
    /* прописываем логику игры найди пару */

    var check = false,
      selcolor = 0,
      sela, steps = 0,
      open = 0,
      timer, a = document.getElementsByTagName('a');
    for (var i = 0; i < a.length; i++) {
      a[i].addEventListener('click', function(e) {
        var el = e.target;
        if (el.className.indexOf('hidden') > -1) {
          steps++;
          el.className = el.className.replace('hidden', '');
          setTimeout(function() {
            if (check) {
              check = false;
              if (el.getAttribute('color') == selcolor) {
                open++;
                if (open == 8) alert('Количество шагов: ' + steps + ' Затраченное время ' + z);
              } else {
                sela.className += ' hidden';
                el.className += ' hidden';
              }
            } else {
              selcolor = el.getAttribute('color');
              sela = el;
              check = true;
            }
          }, 100);
        }
      });
    }
   }
  
    /* прописываем секундомер */

    let z = 0;

    function add0(x, y) {
    let s = '00' + x;
    return s.substr(s.length - y);
    }
   
   function clockRun() {
 
     let ms = Date.now() - startTime;
     let S = Math.floor(ms / 1000);
     ms = ms % 1000;
     let M = Math.floor(S / 60);
     S = S % 60;
     document.querySelector('#watch tt').textContent = [add0(M, 2), add0(S, 2), add0(ms, 3)].join(':');
     z = [add0(M, 2), add0(S, 2), add0(ms, 3)].join(':');
     RAF = requestAnimationFrame(clockRun);
   
   }
   let startTime;
   let RAF;
   document.querySelector('#watch button').onclick = function() {
     switch (this.textContent) {
       case 'Старт':
         startTime = Date.now();
         this.textContent = 'Стоп';
         clockRun();
         set();
         break;
 
       case 'Стоп':
         this.textContent = 'Сброс';
         cancelAnimationFrame(RAF);
         break;
 
       case 'Сброс':
         this.textContent = 'Старт';
         document.querySelector('#watch tt').textContent = '00:00:000';
         location.reload();
         break;
     }
   }
 }