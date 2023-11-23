const store = [
    {name: 'Uramaki', id: 1, img: 'jpeg'},
    {name: 'Niguiri', id: 3},
    {name: 'Maki', id: 2},
    {name: 'Sashimi', id: 5, img: 'jpeg'},
    {name: 'Gunkan', id: 4}
];

const main = $('main');
const menu = $('.menu');

$('header').click(() => {

    if (!confirm('¿Resetear contador?')) return;

    localStorage.clear();
    update();
    
})

const icon = (icon) => `<i class="material-symbols-outlined">${icon}</i>`

// Crear menu iconos
menu.html(['edit', 'restart_alt'].map(icon));

main.html(
    store.map(a => `
        <div class="item" id="${a.id}">
            <div class="l">
                <img src="imgs/${a.id}.${a.img || 'jpg'}" />
                <p>${a.name}</p>
            </div>
            <div class="r">
                <p class="count"></p>
                ${['remove', 'add'].map(icon).join('')}
            </div>
        </div>
    `)
);

// Incrementar contador
main.find('i').click((ev) => {

    ev.stopPropagation();
    
    var
        {target} = ev,
        {id} = target.closest('.item'),
        {[id]: count} = localStorage,
        isAdd = $(target).html() == 'add';

    count = Number(count);

    if (!isAdd && !count) return;

    localStorage[id] = count + (isAdd ? 1 : -1);
    update();
    
});

main.children().click(({currentTarget: ct}) => $(ct).find('i').last().click())

// Actualizar estados
const update = () => {

    var total = 0;
    $.each(main.children(), (_, el) => {

        var {id} = el;
        !localStorage[id] ? localStorage[id] = 0 : 0;
        var {[id]: count} = localStorage;
        $(el).find('.count').html(count);
        total += Number(count);
        
    });

    $('header > *').html(['Sushi Counter', total].filter(a => a).join(': '));
    
}

update();