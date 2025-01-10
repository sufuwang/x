declare namespace WX {
  interface LoginResponse {
    session_key: string;
    openid: string;
  }
}

interface Profile {
  openid: string;
  nickname: string;
  avatar: string;
}

interface Task {
  id?: number;
  openid: string;
  visible: 'public' | 'onlyMe';
  priority: 'important' | 'common';
  catalog?: string;
  title: string;
  taskDesc?: string;
  deadline: string;
  registerDate: string;
  lastUpdateDate: string;
  done: boolean;
  doneDate: string;
  doneDesc?: string;
  doneAttachMent?: string;
}
