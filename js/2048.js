$(document).ready(function() {
    $('.cube').height($('.cube').width());
    $('#arrow-keys').height($('.cube').height());
});
$(window).resize(function() {
    $('.cube').height($('.cube').width());
    $('#arrow-keys').height($('.cube').height());
});
document.onkeydown = checkKey;

function checkKey(e)
{
    e = e || window.event;

    if (e.keyCode == '38')
    {
        for (let row_index = 0 ; row_index < 4 ; row_index++)
        {
            for (let column_index = 0 ; column_index < 4 ; column_index++)
            {
                if(app.can_move(row_index, column_index, 'UP'))
                {
                    app.move_cube(row_index, column_index, 'UP');
                }
            }
        }

        generate_cube();
    }
    else if (e.keyCode == '40')
    {
        for (let row_index = 3 ; row_index > -1 ; row_index--)
        {
            for (let column_index = 0 ; column_index < 4 ; column_index++)
            {
                if(app.can_move(row_index, column_index, 'DOWN'))
                {
                    app.move_cube(row_index, column_index, 'DOWN');
                }
            }
        }

        generate_cube();
    }
    else if (e.keyCode == '37')
    {
        for (let column_index = 0 ; column_index < 4 ; column_index++)
        {
            for (let row_index = 0 ; row_index < 4 ; row_index++)
            {
                if(app.can_move(row_index, column_index, 'LEFT'))
                {
                    app.move_cube(row_index, column_index, 'LEFT');
                }
            }
        }

        generate_cube();
    }
    else if (e.keyCode == '39')
    {
        for (let column_index = 3 ; column_index > -1 ; column_index--)
        {
            for (let row_index = 0 ; row_index < 4 ; row_index++)
            {
                if(app.can_move(row_index, column_index, 'RIGHT'))
                {
                    app.move_cube(row_index, column_index, 'RIGHT');
                }
            }
        }

        generate_cube();
    }
}

function generate_cube()
{
    let options = [];

    for (let row = 0 ; row < 4 ; row++)
    {
        for (let column = 0 ; column < 4 ; column++)
        {
            let value = data.cubes[row][column].value;

            if (value == 0)
            {
                options.push([row, column]);
            }
        }
    }

    let cube = options[Math.floor((Math.random() * options.length))];
    let row = cube[0], column = cube[1];
    data.cubes[row][column].value = 2;
}

let data = {
    score: 0,
    cubes: [
        [
            {
                "value": 0
            },
            {
                "value": 0
            },
            {
                "value": 0
            },
            {
                "value": 0
            }
        ],
        [
            {
                "value": 0
            },
            {
                "value": 0
            },
            {
                "value": 0
            },
            {
                "value": 0
            }
        ],
        [
            {
                "value": 0
            },
            {
                "value": 0
            },
            {
                "value":2
            },
            {
                "value": 0
            }
        ],
        [
            {
                "value": 0
            },
            {
                "value": 2
            },
            {
                "value": 0
            },
            {
                "value": 0
            }
        ]
    ]
};
let app = new Vue({
    el: '#app',
    data: data,
    methods: {
        key_pressed: function(direction)
        {
            checkKey({keyCode: direction});
        },
        can_move: function(row, column, direction)
        {
            if (direction === 'UP')
            {
                if (row == 0) {return false;}
                else {
                    let thrower = data.cubes[row][column].value;
                    let catcher = data.cubes[row-1][column].value;

                    return (thrower != 0 || catcher === 0 || catcher === thrower)
                }
            }
            else if (direction === 'DOWN')
            {
                if (row == 3) {return false;}
                else {
                    let thrower = data.cubes[row][column].value;
                    let catcher = data.cubes[row+1][column].value;

                    return (thrower != 0 || catcher === 0 || catcher === thrower)
                }
            }
            else if (direction === 'LEFT')
            {
                if (column == 0) {return false;}
                else {
                    let thrower = data.cubes[row][column].value;
                    let catcher = data.cubes[row][column-1].value;

                    return (thrower != 0 || catcher === 0 || catcher === thrower)
                }
            }
            else if (direction === 'RIGHT')
            {
                if (column == 3) {return false;}
                else {
                    let thrower = data.cubes[row][column].value;
                    let catcher = data.cubes[row][column+1].value;
                    return (thrower != 0 || catcher === 0 || catcher === thrower)
                }
            }
        },
        move_cube: function(row, column, direction)
        {
            if (direction === 'UP')
            {
                let thrower = data.cubes[row][column].value;
                let catcher = data.cubes[row-1][column].value;

                while (catcher == 0 && row > 0)
                {
                    data.cubes[row - 1][column].value = thrower;
                    data.cubes[row][column].value = 0;
                    thrower = data.cubes[row-1][column].value;

                    if (row > 1) { catcher = data.cubes[row - 2][column].value; }

                    row = row - 1;
                }

                if (catcher == thrower && thrower != 0)
                {
                    data.cubes[row-1][column].value = thrower*2;
                    data.cubes[row][column].value = 0;

                    data.score = data.score + thrower*2;
                    if (thrower*2 >= 2048) {won();}
                }
            }
            else if (direction === 'DOWN')
            {
                let thrower = data.cubes[row][column].value;
                let catcher = data.cubes[row+1][column].value;

                while (catcher == 0 && row < 3)
                {
                    data.cubes[row + 1][column].value = thrower;
                    data.cubes[row][column].value = 0;

                    thrower = data.cubes[row + 1][column].value;

                    if (row < 2) {
                        catcher = data.cubes[row + 2][column].value;
                    }

                    row = row + 1;
                }

                if (catcher == thrower && thrower != 0)
                {
                    data.cubes[row + 1][column].value = thrower*2;
                    data.cubes[row][column].value = 0;

                    data.score = data.score + thrower*2;
                    if (thrower*2 >= 2048) {won();}
                }
            }
            else if (direction === 'LEFT')
            {
                let thrower = data.cubes[row][column].value;
                let catcher = data.cubes[row][column - 1].value;

                while (catcher == 0 && column > 0)
                {
                    data.cubes[row][column - 1].value = thrower;
                    data.cubes[row][column].value = 0;

                    thrower = data.cubes[row][column - 1].value;
                    if (column > 1) {
                        catcher = data.cubes[row][column - 2].value;
                    }

                    column = column - 1;
                }

                if (catcher == thrower && thrower != 0)
                {
                    data.cubes[row][column - 1].value = thrower*2;
                    data.cubes[row][column].value = 0;

                    data.score = data.score + thrower*2;
                    if (thrower*2 >= 2048) {won();}
                }
            }
            else if (direction === 'RIGHT')
            {
                let thrower = data.cubes[row][column].value;
                let catcher = data.cubes[row][column + 1].value;

                while (catcher == 0 && column < 3)
                {
                    data.cubes[row][column + 1].value = thrower;
                    data.cubes[row][column].value = 0;
                    thrower = data.cubes[row][column + 1].value;

                    if (column < 2) { catcher = data.cubes[row][column + 2].value;}

                    column = column + 1;
                }

                if (catcher == thrower && thrower != 0)
                {
                    data.cubes[row][column + 1].value = thrower*2;
                    data.cubes[row][column].value = 0;

                    data.score = data.score + thrower*2;
                    if (thrower*2 >= 2048) {won();}
                }
            }
        }
    }
});