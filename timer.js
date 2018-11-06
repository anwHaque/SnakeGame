var min=0;
var sec =0;
var msec =0;

function Timer()
    {
        msec++;
        if(msec >= 10)
        {
            msec = 0;
            sec++;
            if(sec < 10)
            {
                sec ="0"+sec;
            }
        }

        if(sec >= 60)
        {
            sec =0;
            min++;
            if(min<10)
            {
                min = "0"+min;
            }
        }
    }

    setInterval(Timer,100);
