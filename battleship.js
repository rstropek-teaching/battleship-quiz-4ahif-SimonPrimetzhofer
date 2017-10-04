

$(() => {
  // Select table containing the battleground
  const battleground = $('#battleground');

  // Build 10 x 10 grid for battleground
  for (let row = 0; row < 10; row++) {
    // Create table row
    const tr = $('<tr>');
    for (let column = 0; column < 10; column++) {
      // Create table cell with CSS class `water`. Note that we use
      // HTML data attributes  to store the coordinates of each cell
      // (see https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes). 
      // That makes it much easier to find cells based on coordinates later.
      $('<td>').addClass('water').attr('data-r', row).attr('data-c', column).appendTo(tr);
    }

    // Add table row to battleground table
    tr.appendTo(battleground);
  }

  $('#generate').click(() => {
    //Border-Values
    const lenX=10;
    const lenY=10;

    //Possible Sizes for the ships starting with 5, going down to 2
    const size=[5,4,3,3,2];
    //Clear battleground
    for(let i=0;i<lenX;i++){
      for(let j=0;j<lenY;j++)
      $(`td[data-r=${i}][data-c=${j}]`).removeClass('ship').addClass('water');
    }
    /*

      Before starting, I assume that a diagonal neighbour is OK
      A neighbour which is directly under/over or next to a ship is not OK and not painted

    */
    //Game-Loop
    for(let count=0;count<size.length;){
      //Random starting coordinates with upper border 9 and lower border 0 (=> fields from 0 to 9 in both dimensions)
      let startX=parseInt(0+Math.random()*(10-0));
      let startY=parseInt(0+Math.random()*(10-0));

      //Random number for deciding direction
      let rand=parseInt(0+Math.random()*(100-0));

      //Condition-variable for indicating a ship next to another one
      let skip=false;

      //Checking possible directions and painting the squares
      if(rand%2==0&&startX+size[count]<lenX){//Vertical align

        //Ship before or after the current ship? If yes, skip this ship and do not paint it
        if($(`td[data-r=${startX-1}][data-c=${startY}]`).hasClass("ship")||$(`td[data-r=${startX+size[count]}][data-c=${startY}]`).hasClass("ship"))
          skip=true;

        //Check the fields on which the ship should be painted and the direct neighbours, if there's already a ship - if yes, skip
        for(let i=0;i<size[count];i++){
          if($(`td[data-r=${startX+i}][data-c=${startY}]`).hasClass("ship")||$(`td[data-r=${startX+i}][data-c=${startY-1}]`).hasClass("ship")||$(`td[data-r=${startX+i}][data-c=${startY+1}]`).hasClass("ship"))
            skip=true;
        }
        //Skip the current ship?
        if(skip==false){//Don't skip
          for(let i=0;i<size[count];i++)
            $(`td[data-r=${startX+i}][data-c=${startY}]`).removeClass('water').addClass('ship');//Paint the squares red
          count++;//Next size in the array 
        }else skip=false;//Skip - do nothing and reset the skip variable
         
      }else if(rand%2==1&&startY+size[count]<lenY&&count%2==1){//Horizontal align
        //Ship before or after the current ship?
        if($(`td[data-r=${startX}][data-c=${startY-1}]`).hasClass("ship")||$(`td[data-r=${startX}][data-c=${startY+size[count]}]`).hasClass("ship"))
        skip=true;
        //Ship next to the current ship or on the fields on which the ship should be painted?  
        for(let i=0;i<size[count];i++){
          if($(`td[data-r=${startX}][data-c=${startY+i}]`).hasClass("ship")||($(`td[data-r=${startX-1}][data-c=${startY+i}]`).hasClass("ship"))||($(`td[data-r=${startX+1}][data-c=${startY+i}]`).hasClass("ship")))
            skip=true;//Skip the current ship
        }
        if(skip==false){//Skip?
          //If every test is OK, the ship is painted
          for(let i=0;i<size[count];i++)
            $(`td[data-r=${startX}][data-c=${startY+i}]`).removeClass('water').addClass('ship');//Paint the ship red
          count++;//Next size
        }else skip=false;//Skip the ship and reset the skip variable
      } 
    }
    /*
                                                      _       _       _       _       _       _       _       _
                                            .-"-._,-'_`-._,-'_`-._,-'_`-._,-'_`-,_,-'_`-,_,-'_`-,_,-'_`-,_,-'_`-,
                                          (  ,-'_,-".>-'_,-".>-'_,-".>-'_,-".>-'_,-~.=-'_,-~.=-'_,-~.=-'_,-~-} ;
                                            \ \.'_>-._`-<_>-._`-<_>-._`-<_>-._`-._=-._`-._=-._`-._=-._`-._~--. \
                                            /\ \/ ,-' `-._,-' `-._,-' `-._,-' `-._,-' `-._,-' `-._,-' `-._`./ \ \
                                          ( (`/ /                                                        `/ /.) )
                                            \ \ / \                                                       / / \ /
                                            \ ') )              .-,--.           .                     ( (,\ \
                                            / \ / /                `\__  ,-,-. ,-. |- . .                 \ / \ \
                                          ( (`/ /                  /    | | | | | |  | |                  / /.) )
                                            \ \ / \                '`--' ' ' ' |-' `' `-|                 / / \ /
                                            \ ') )                           |       /|                ( (,\ \
                                            / \ / /                            '      `-'                 \ / \ \
                                          ( (`/ /                                                         / /.) )
                                            \ \ / \          ,-,-,-.                                      / / \ /
                                            \ ') )         `'| | |   ,-. ,-. ,-. ,-. ,-. ,-.           ( (,\ \
                                            / \ y /            ; | | \ |-' `-. `-. ,-| | | |-'            \ y \ \
                                          ( ( y /               ' `-' `-' `-' `-' `-^ `-| `-'             y /.) )
                                            \ \ / \                                     ,|                / / \ /
                                            \ ') )                                    `'               ( (,\ \
                                            / \ / /                                                       \ / \ \
                                          ( (`/ /                                                         / /.) )
                                            \ \ / \       _       _       _       _       _       _       / / \ /
                                            \ `.\ `-._,-'_`-._,-'_`-._,-'_`-._,-'_`-._,-'_`-._,-'_`-._,-'_/,\ \
                                            ( `. `,~-._`-=,~-._`-=,~-._`-=,~-._`-=,~-._`-=,~-._`-=,~-._`-=,' ,\ \
                                            `. `'_,-=_,-'_,-=_,-'_,-=_,-'_,-=_,-'_,-=_,-'_,-=_,-'_,-=_,-'_,"-' ;
                                              `-' `-._,-' `-._,-' `-._,-' `-._,-' `-._,-' `-._,-' `-._,-' `-.-'

    */
    
  });
    
});