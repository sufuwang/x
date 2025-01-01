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
  openid: string;
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
