const SIDEBAR_TICKET = 'ticket_sidebar';
const SIDEBAR_NEW_TICKET = 'new_ticket_sidebar';
const SIDEBAR_USER = 'user_sidebar';
const SIDEBAR_ORGANIZATION = 'organization_sidebar';
const TICKET = 'ticket_editor';
const MODAL = 'modal';
const LEFT = 'nav_bar';
const TOP = 'top_bar';
const BACKGROUND = 'background';

const isSidebar = location => {
  return [
    SIDEBAR_TICKET,
    SIDEBAR_NEW_TICKET,
    SIDEBAR_USER,
    SIDEBAR_ORGANIZATION
  ].includes(location);
};

const isModal = location => {
  return [TOP, MODAL].includes(location);
};

const isTicket = location => {
  return [SIDEBAR_TICKET, SIDEBAR_NEW_TICKET].includes(location);
};

const isFullscreen = location => {
  return [LEFT].includes(location);
};

export const locations = {
  isSidebar,
  isModal,
  isTicket,
  isFullscreen,
  SIDEBAR_TICKET,
  SIDEBAR_NEW_TICKET,
  SIDEBAR_USER,
  SIDEBAR_ORGANIZATION,
  TICKET,
  MODAL,
  LEFT,
  TOP,
  BACKGROUND
};
