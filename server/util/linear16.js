import ffmpeg from 'fluent-ffmpeg';
import ffmpeg_static from 'ffmpeg-static';
import fs from 'fs';

module.exports = (filePathIn) => new Promise((resolve, reject) => {
    const filePathOut = `${Math.random().toString(36)}.tmp.linear16`
    if (!fs.existsSync(filePathIn)) {
        throw new Error('Input file must exist.');
    }
    try {
        ffmpeg()
            .setFfmpegPath(ffmpeg_static.path) 
            .input(filePathIn)
            .outputOptions([
                '-f s16le',
                '-acodec pcm_s16le',
                '-vn',
                '-ac 1',
                '-ar 16k',
                '-map_metadata -1'
            ])
            .save(filePathOut)
            .on('end', () => resolve(filePathOut));

    } catch (e) {
        reject(e);
    }
});