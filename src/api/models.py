import os
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.hybrid import hybrid_property
from werkzeug.security import generate_password_hash,check_password_hash

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    
    # password is private and wont be accessable
    _password = db.Column(db.String(275), nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "username": self.username,
            "is_active ": self.is_active
        }
    
    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def password(self,password):
        self._password = generate_password_hash(password)

    def checkpassword(self,password):
        return check_password_hash(self.password, password)


class Questions(db.Model):
    __tablename__ = "questions"
    id = db.Column(db.Integer, primary_key=True)
    lessons = db.Column(db.Integer)
    question = db.Column(db.String(256))
    lesson_para = db.Column(db.String(500))
    
    answer = db.Column(db.Integer, db.ForeignKey("options.id"))
    option = db.relationship("Options", back_populates="question")
    
    def __repr__(self):
        return f'<Questions{self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "lessons": self.lessons,
            "question": self.question,
            "lesson_para": self.lesson_para,
            "answer" : self.option.serialize(),
            
        }
class Options(db.Model):
    __tablename__ = "options"
    id = db.Column(db.Integer, primary_key=True)
    option = db.Column(db.String(256))
    audio = db.Column(db.String(700))
    
    question = db.relationship("Questions", back_populates="option")
    
      
    def __repr__(self):
        return f'<Options{self.option}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "option": self.option,
            "audio": self.audio,
           
        }

class Lesson_Para(db.Model):
    __tablename__ = "lesson_para"
    id = db.Column(db.Integer, primary_key=True)
    lesson_para = db.Column(db.String(256))
   
    
    def __repr__(self):
        return f'<Lesson_Para{self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "lesson_para": self.lesson_para,
        }

    
class Account(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship("User")

    def __repr__(self):
        return f'<Account {self.id}'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "user": self.user

        }
# _______________________________________________________________________________________________
class Favorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    favorites = db.Column(db.String(50), unique=False, nullable=True)
    

    def __repr__(self):
        return f'<User {self.favorites}>'

    def serialize(self):
        return {
            "id": self.id,
            "favorites": self.favorites,
        }

# _______________________________________________________________________________________________

class Lesson1_vocab(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(50), unique=False, nullable=False)
    mandarin = db.Column(db.String(150), unique=False, nullable=False)
    phonetic = db.Column(db.String(50), unique=False, nullable=False)
    phoneticM = db.Column(db.String(150), unique=False, nullable=False)
    images = db.Column(db.String(500), unique=False, nullable=True)
    part_of_speech = db.Column(db.String(500), unique=False, nullable=True)
    
    def __repr__(self):
        return f'<Lesson1_vocab {self.id}>'
    
    def serialize(self):
        return {
            "id" : self.id,
            "word" : self.word,
            "mandarin" : self.mandarin,
            "phonetic" : self.phonetic,
            "phoneticM" : self.phoneticM,
            "images" : self.images,
            "part_of_speech" : self.part_of_speech,
            
        }
        
# _______________________________________________________________________________________________

adjacency_relation = db.Table(
    "adjacency_relation",
    db.metadata,
    db.Column("node_id_parent", db.Integer, db.ForeignKey("lesson1_vocab.id")),
    db.Column("node_id_child", db.Integer, db.ForeignKey("lesson1_vocab.id"))
)


class Lesson(db.Model):
    __tablename__ = "lesson"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), nullable=True)
    child = db.relationship(
        "Lesson",
        secondary=adjacency_relation,
        primaryjoin=(id == adjacency_relation.c.node_id_parent),
        secondaryjoin=(id == adjacency_relation.c.node_id_child),
        backref="parent",
        uselist=False
    )

    def serialize(self):
        if self.child:
            child_url = "".join([
                os.getenv("BACKEND_URL"),
                "/api/lesson/",
                str(self.child.id)
            ])
        else:
            child_url = None

        return {
            "id": self.id,
            "name": self.name,
            "next": child_url
        } 