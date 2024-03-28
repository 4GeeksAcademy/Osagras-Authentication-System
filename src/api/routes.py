"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required



api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()
    if user is None:
        new_user = User(email=data["email"], password=data["password"], is_active=True)
        db.session.add(new_user)
        db.session.commit()
        response_body ={
            "msg": "User created suscessfully"
         }
        return jsonify(response_body), 201
    else:
        return jsonify({"msg": "This email has alread been used" }),401


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()

    if user == None:
        return jsonify({"msg":"Could not find email"}), 401
    if email != user.email or password != user.password:
        return jsonify({"msg": "Wrong email or password"}), 401
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    if user is None:
        return jsonify({"msg": "No existe el usuario"}), 401
    response_body = {"user": user.serialize()}
    return jsonify(response_body), 200