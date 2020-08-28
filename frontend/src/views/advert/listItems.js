import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PostAddIcon from "@material-ui/icons/PostAdd";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ContactsIcon from "@material-ui/icons/Contacts";
import MessageIcon from "@material-ui/icons/Message";
import Divider from "@material-ui/core/Divider";

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DateRangeIcon />
      </ListItemIcon>
      <ListItemText primary="Kalendarz" />
    </ListItem>
    <Divider />
    <ListItem button>
      <ListItemIcon>
        <PostAddIcon />
      </ListItemIcon>
      <ListItemText primary="Dodaj lekcje" />
    </ListItem>
    <Divider />
    <ListItem button>
      <ListItemIcon>
        <ListAltIcon />
      </ListItemIcon>
      <ListItemText primary="Moje lekcje" />
    </ListItem>
    <Divider />
    <ListItem button>
      <ListItemIcon>
        <ContactsIcon />
      </ListItemIcon>
      <ListItemText primary="Profil" />
    </ListItem>
    <Divider />
    <ListItem button>
      <ListItemIcon>
        <MessageIcon />
      </ListItemIcon>
      <ListItemText primary="Wiadomości" />
    </ListItem>
    <Divider />
  </div>
);
