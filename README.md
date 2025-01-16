## 🐛 bugs
### 修改时区

```shell
# 查看当前时区文件
ls -l /etc/localtime

# 列出所有时区文件
ls /usr/share/zoneinfo/

# 删除当前的时区链接并创建新的链接
rm -f /etc/localtime
ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

# 可能还需要手动更新该文件
echo "Asia/Shanghai" | sudo tee /etc/timezone

# 校验时区
date

# 可能需要重启服务
systemctl restart systemd-timedated
```