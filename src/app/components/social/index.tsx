import * as React from "react"
import { Box, Toolbar, Typography } from '@material-ui/core'
// import { Divider, List, ListItem, ListItemIcon, Drawer, Grid, Snackbar } from '@material-ui/core';
// import { Alert, AlertTitle } from '@material-ui/lab';
// import MailIcon from '@material-ui/icons/Mail';
// import MenuIcon from '@material-ui/icons/Menu';
// import InboxIcon from '@material-ui/icons/Inbox';
// import { Formik } from 'formik';

// import TextField from "../custom/TextField";
// import Card from "../custom/Card";
// import SaveButton from "../custom/SaveButton";

// import { connect } from "react-redux";
// import { addUser, getUser } from "../../redux/actions/users";


const drawerWidth = 240;


class Social extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Box>
                {/* <Drawer sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar />
                    <Divider />
                    <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        </ListItem>
                    ))}
                    </List>
                    <Divider />
                    <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        </ListItem>
                    ))}
                    </List>
                </Drawer> */}
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                >
                    <Toolbar />
                    <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                    enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                    imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                    Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                    Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                    nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                    leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                    feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                    consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                    sapien faucibus et molestie ac.
                    </Typography>
                    <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                    eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                    neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                    tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                    sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                    tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                    gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                    et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                    tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                    eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                    posuere sollicitudin aliquam ultrices sagittis orci a.
                    </Typography>
                </Box>
            </Box>
        );
    }
}

export default Social;
