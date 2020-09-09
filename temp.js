Tourdata.push(req.body.tour_name);
    Tourdata.push(req.body.tour_date);
    Tourdata.push(req.body.tour_disp_text);
    Tourdata.push(req.body.tour_disp_img);
    Tourdata.push(req.body.tour_destination);
    Tourdata.push(req.body.tour_dep_city);
    Tourdata.push(parseInt(req.body.tour_duration));
    Tourdata.push(parseInt(req.body.tour_price));
    //Tourdata.push(parseInt(req.body.tour_));
    //console.log(req.body);
    Tour.create({ 
        name :        Tourdata[0], 
        date :        Tourdata[1],
        disp_text :   Tourdata[2],
        disp_img :    Tourdata[3],
        destination:  Tourdata[4],
        dep_city:     Tourdata[5],
        tour_duration : Tourdata[6],
        price:         Tourdata[7],
        number:         Tourdata[8]
    }
        ,function(error,obj)
        {if(error)
            {console.log(error);}
            else{
                console.log("Saved to the data base");
                console.log(obj);
            }
    });