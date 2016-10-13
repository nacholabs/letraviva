
// funcs

window.cardfocus=function(){
    $('.c.on .i').flexText();
    if($('.c.on input').length){
        $('.c.on').find('input:first').focus().select();
    }else{
        $('.c.on .i').focus();
    }
    var h=false;
    $('.c').each(function(){
        if($(this).hasClass('h1'))
            h=$(this).find('.i').val();
        if($(this).hasClass('on'))
            return false;
    });
    $('#h').html(h).toggleClass('on',(h && !$('.c.on.h1').length));
    $('body,html,#screen').scrollTop(0);
}

window.card=function(cl,txt,resid){

    //console.info(cl,txt,resid);

    if(typeof(resid)!='undefined' || typeof(index.res[resid])!='undefined'){
        var resource=index.res[resid];
        cl='res '+resource.t;
    }else{
        var resource=false;
        if(!cl || !cl.length) cl='p';
        cl='txt '+cl;
    }

    var c = $('<div></div>').addClass('c post').addClass(cl).appendTo('#screen');

    if(!resource){
        c.html('<textarea class="i" spellcheck=false></textarea>');
    }else{
        c.data('res',resid);
        if(resource.t=='video'){
            c.html('<div class="in vi"><iframe src="https://www.youtube.com/embed/'+ytid(resource.url)+'?autoplay=1&autohide=1&modestbranding=1&theme=light&rel=0&showinfo=0&loop=1&enablejsapi=1&color=white"></iframe></div><textarea class="i" spellcheck=false></textarea>');
        }else if(resource.t=='url'){
            c.html('<div class="in fr"><iframe src="'+resource.url+'"></iframe></div><textarea class="i" spellcheck=false></textarea>');
        }else{
            c.html('<div class="in im" style="background-image:url('+resource.url+');"></div><textarea class="i" spellcheck=false></textarea>');
        }
    }

    if(typeof(txt)!='undefined' && txt.length)
        c.find('.i').val(txt);

    setTimeout(function(){
        $('.c.on').removeClass('on').addClass('pre');
        c.addClass('on').removeClass('post').find('.in').addClass('on');
        cardfocus();
    },5);
}

window.res=function(url,tag,t,loading){

    //console.info(url,tag,t,loading);

    if(!url.length)
        return false;

    if(typeof(tag)=='undefined' || tag==null){
        tag=url.split('/');
        tag=tag[tag.length-1];
        tag=tag.substr(0,tag.lastIndexOf('.'));
    }

    if(typeof(t)=='undefined'){
        if(url.indexOf('yout')==-1){
            t='url';
        }else{
            t='video';
        }
    }

    if(loading==undefined){
        index.res.push({t:t,tag:tag,url:url});
        dataid=index.res.length-1;
    }else{
        dataid=loading;
    }
    $('#res ul').append('<li title="'+tag.toLowerCase()+'" data-id="'+dataid+'"><input value="'+tag+'"/>'+(t=='img'?'<span style="background-image:url('+url+');"></span>':'<span><a href="'+url+'" target="_blank">['+t.toUpperCase()+']</a></span>')+'</li>');

}

window.del=function(){
    var nx=$('.c.on').next().length?$('.c.on').next():$('.c.on').prev();
    $('.c.on').remove();
    if(nx.length){
        nx.removeClass('pre post').addClass('on');
        cardfocus();
    }else{
        card();
    }
}

window.scroll=function(wh){
    var t = wh=='prev'?$('.c.on').prev():$('.c.on').next();
    if(t.length){
        $('.c.on').removeClass('on').addClass(wh=='prev'?'post':'pre');
        t.addClass('on').removeClass('pre post');
        cardfocus();
    }
    $('#screen,body').scrollTop(0);
}

window.ytid=function(url){
    var ID = '';
    url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if(url[2] !== undefined) {ID = url[2].split(/[^0-9a-z_\-]/i); ID = ID[0]; }
    else {ID = url; }
    return ID;
}

window.save=function(){
    // diapositivas
    index.cards=[];
    $('.c').each(function(){
        var p={};

        if($(this).find('.i').val().length)
            p.txt=$(this).find('.i').val();

        if($(this).data('res'))
            p.res=index.res[$(this).data('res')].tag;

        var cl=$(this).attr('class').replace('txt','').replace('res','').replace('on','').replace('pre','').replace('post','').replace('c','').replace('p','').trim();
        if(cl.length) p.cl=cl;

        index.cards.push(p);
    });
}

window.load=function(){
    // cargar recursos
    for(r in index.res)
        res(index.res[r].url,index.res[r].tag,index.res[r].t,r);
    // cargar diapositivas
    for(c in index.cards){
        if(index.cards[c].res)
            for(r in index.res)
                if(index.res[r].tag==index.cards[c].res)
                    index.cards[c].res=r;
        setTimeout(function(ca) { card(ca.cl,ca.txt,ca.res); },(c+1)*10,index.cards[c]);
    }
}




// events

$(function(){

    window.f=false;

    $(document).on('keydown',function(e){
        if(e.ctrlKey || e.metaKey || e.altKey) {
            if(e.which==90 && !f){
                window.f=true;
                $('body').css({'background-image':'url('+freak[Math.floor(Math.random()*freak.length)]+')'}).addClass('freaking');
            }
            e.stopImmediatePropagation();
            e.preventDefault();
            return false;
        }
    });


    $(document).on('keyup',function(e){
        
        //console.info(e.which,e);

        if(e.ctrlKey || e.metaKey || e.altKey){

            var prevent=true;

            // atajos

            if(e.which==13 || e.which==80){ // enter o p
                card();
            }else if(e.which==49){ // 1
                card('h1');
            }else if(e.which==50){ // 2
                card('h2');
            }else if(e.which==81){ // q
                card('quote');
            }else if(e.which==73){ // i
                $('#tag').focus();
            }else if(e.which==8){ // backspace
                del();
            }else if(e.which==83){ // s
                save();
                $('#save pre').html(JSON.stringify(window.index),null,"\t");
                $('#save').toggleClass('on');
                if(!$('#save').hasClass('on'))
                    cardfocus();
            }else if(e.which==79){ // o
                path=prompt('RUTA A CARPETA DE CONTENIDO');
                if(path){
                    window.localStorage['open']=path;
                    window.location.reload();
                }
            }else if(e.which==74){ // j
                eval($('.c.on .i').val());
            }else if(e.which==90){ // z
                f=false;
                setTimeout(function(){ if(!f) $('body').css({'background-image':'none'}).removeClass('freaking'); },100);
            }else if(e.which==38){ // arriba
                scroll('prev');
            }else if(e.which==40){ // abajo
                scroll('next');
            }else if(e.which==37){ // izq
                $('#res').addClass('on');
                $('#tag').focus();
            }else if(e.which==39){ // der
                $('#res').removeClass('on');
            }else if(e.which==82){ // r
                $('#res').toggleClass('on');
                if($('#res').hasClass('on')){
                    $('#tag').focus();
                }else{
                    cardfocus();
                }
            }else{
                prevent=false;
            }
            if(prevent){
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }

        }else if(e.which==13){

            if($('#tag').is(':focus')){

                // insercion de recurso

                if($('#res li.enter').length){
                    var r=$('#res li.enter').eq(0);
                    card(null, "", r.data('id'));
                    $('#res').removeClass('on');
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    return false;
                }

            }
        }else if(e.which==27){

            // esc
            $('#res,#save').removeClass('on');
            cardfocus();

        }else if($('#tag').is(':focus')){

            // filtrar recursos

            var q=$('#tag').val().toLowerCase();
            if(q.length){
                $('#res li').hide().removeClass('enter').filter('[title*="'+q+'"]').show();
                $('#res li:visible').eq(0).addClass('enter');
            }else{
                $('#res li').show().removeClass('enter');
            }

        }else{
            //console.log(e.which);
        }
    });

    $(document).on('submit','#res form',function(e){

        // nuevo recurso 

        res($('#url').val(),$('#tag').val());
        $('#res form input').val('');
        $('#res li').show();
        e.preventDefault();
        return false;

    });

    $(document).on('click','#res li span',function(e){

        var r=$(this).parents('li');
        card(null, "", r.data('id'));

    });

    $(document).on('blur','#res li input',function(e){
        var li=$(this).parents('li');
        li.attr('title',$(this).val());
        index.res[li.data('id')].tag=$(this).val();
    });

    $(document).on('click','#save button',function(e){ $('#save').removeClass('on');cardfocus(); });

    $(document).on('drop',function(ev){
        $('#dz').removeClass('on');
        var path=prompt('RUTA A LAS IMÁGENES');
        ev.preventDefault();
        var dt = ev.originalEvent.dataTransfer;
        if (dt.items) {
            for (var i=0; i < dt.items.length; i++) {
                if (dt.items[i].kind == "file") {
                    var f = dt.items[i].getAsFile();
                    res(path+'/'+f.name,null,'img');
                }
            }
        } else {
            for (var i=0; i < dt.files.length; i++) {
                var f = dt.files[i];
                res(path+'/'+f.name,null,'img');
            }  
        }
        return false;
    });

    $(document).on('dragover',function(ev){
      $('#dz').addClass('on');
      ev.preventDefault();
      return false;
    });

    $(document).on('dragend',function(ev){
      $('#dz').removeClass('on');
      var dt = ev.originalEvent.dataTransfer;
      if (dt.items) {
        for (var i = 0; i < dt.items.length; i++)
          dt.items.remove(i);
      } else {
        ev.originalEvent.dataTransfer.clearData();
      }
      return false;
    });




// init

    //$.getJSON('letraviva/freak.json',function(r){ window.freak=r; });
    if(typeof(window.localStorage['open'])!='undefined'){
        $.getJSON(window.localStorage['open']+'/index.json',function(r){
            window.index=r;
            load();
        });
        delete(window.localStorage['open']);
    }else{
        window.index={res:[],cards:[]};
        card();
    }
});


