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
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DateRangeIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Kalendarz" />
    </ListItem>
    <Divider />
    <ListItem button>
      <ListItemIcon>
        <PostAddIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Dodaj lekcje" />
    </ListItem>
    <Divider />
    <ListItem button>
      <ListItemIcon>
        <ListAltIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Moje lekcje" />
    </ListItem>
    <Divider />
    <ListItem button>
      <ListItemIcon>
        <ContactsIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Profil" />
    </ListItem>
    <Divider />
    <ListItem button>
      <ListItemIcon>
        <MessageIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Wiadomości" />
    </ListItem>
    <Divider />
    <ListItem button>
      <ListItemIcon>
        <PowerSettingsNewIcon color="secondary" />
      </ListItemIcon>
      <ListItemText primary="Wyloguj" />
    </ListItem>
    <Divider />
  </div>
);
