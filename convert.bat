@echo off

for %%a in (*.flv) do (
    ffmpeg -hwaccel cuda -c:v h264_cuvid -i "%%a" -vf subtitles="%%~na.ass" -c:v h264_nvenc -b:v 6000k -c:a copy "results/%%~na.MP4" -y
)