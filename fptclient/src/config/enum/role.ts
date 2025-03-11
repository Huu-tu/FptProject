import { APP } from 'config/constants';
import { app } from 'routes';
import store from 'store';

export enum RoleActionGroup {
  SYSTEM_ADMIN,
  DASHBOARD,
  MANAGE_ACCOUNT,
  SUPPORT,
  PACKAGE,
  NEWS,
  DOCUMENT,
  LICENSE,
  AUTHLOG,
  PROMOTION,
  ORDER,
  COMPANY,
  CATEGORY,
  CRITERIA,
  CRITERIA_GROUP,
  AUDIO,
  CALL,
  KEYWORD,
  CONFIGURATION,
}

export enum ERoleActionKey {
  VIEW,
  WRITE,
  APPROVAL,
  DECISION,
}

export enum ERoleType {
  ADMIN,
  AGENCY,
  PROVIDER,
}

export enum RoleUserClient {
  END_USER,
  USER_ADMIN,
  USER_CHANNEL_LEADER,
  USER_BRANCH,
  USER_AGENT,
  MEMBER_AGENT,
}

export enum RoleTeam {
  MEMBER,
  ADMIN,
}

export const getRoleType = () => {
  if (app === APP.ADMIN) {
    if (store.getState().user[APP.ADMIN]?.agencyId) return ERoleType.AGENCY;
    return ERoleType.ADMIN;
  }
  return ERoleType.PROVIDER;
};
