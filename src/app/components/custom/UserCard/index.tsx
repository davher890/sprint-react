import * as React from 'react';
import { Card, CardContent, Chip, Button, Typography, CardHeader, Avatar } from '@mui/material';
import { red } from '@mui/material/colors';

type Props = {
    data: any,
};


const UserCard: React.FC<Props> = ({data}) => {

    return (
    <Card sx={{ maxWidth: 350, height: 150 }}
        onClick={(e) => {
            window.open("/admin/users/" + data.id, "_self");
        }}>
      {/* <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      /> */}
        <CardHeader
            avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    { data.username[0] }
                </Avatar>
            }
            title={data.username}
            subheader={data.email}
        />
        
        <CardContent>
        {/* <Typography gutterBottom variant="h5" component="div">
        {user.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {user.email}
        </Typography> */}
        { data.manager && <Chip label="Manager" /> }
        { data.admin && <Chip label="Admin" /> }
        </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

export default UserCard