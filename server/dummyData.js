import Recording from './models/recording';

export default function () {
  Recording.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const content1 = ``;

    const content2 = ``;

    const recording1 = new Recording({ title: 'Hello World', cuid: 'cikqgkv4q01ck7453ualdn3hd', content: content1 });
    const recording2 = new Recording({ title: 'Lorem Ipsum', cuid: 'cikqgkv4q01ck7453ualdn3hf', content: content2 });

    Recording.create([recording1, recording2], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
