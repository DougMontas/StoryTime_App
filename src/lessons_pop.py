import json

from app import app, db
from api.models import Lesson1_vocab

lessons = None
lesson_objs = []

with open("./src/lessons.json", 'rt') as json_file:
    data = json.load(json_file)
    lessons = data

with app.app_context():
    for lesson in lessons:
        lesson_objs.append(Lesson1_vocab(
            word=lesson["word"],
            phonetic=lesson["phonetic"],
            mandarin=lesson["mandarin"],
            phoneticM=lesson["phoneticM"],
            images=lesson["images"],
            part_of_speech=lesson["part_of_speech"],
        ))
    db.session.add_all(lesson_objs)
    db.session.commit()