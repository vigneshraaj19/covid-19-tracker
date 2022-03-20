import React from 'react'
import{Card,CardContent,Typography} from "@mui/material"

  function InfoBox({title,cases,total}) {
  return (
    <div>
        <Card className="infoBox">
        <CardContent>
            {/* title (coronavirus cases)*/ }
            <Typography className="infoxBox__title" color="textSecondary">{title}</Typography>
            <h2 className="infoBox__cases">{cases}</h2>
            <Typography className="infoBox__total" color="textSecondary">
                {total} total
                </Typography>
        </CardContent>
        </Card>
    </div>
  )
}

export default InfoBox