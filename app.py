import json

from flask import Flask, render_template, request, redirect, url_for, session
import mysql.connector;

app = Flask(__name__)

con = mysql.connector.connect(host='172.16.0.13', database='projetosistemasweb', user='webhe', password='21250412')

app.secret_key = b'_5#y2L"F4Q8zJKDHASJKDHSAKJDJhsa546546$@213121631872bsvajdbaghcdsad4asd65/'

@app.route("/verificaUser", methods=["POST"])
def verificaUser():
    if con.is_connected():
        form = json.loads(request.data.decode('utf8'))
        usuario = form['usuario']
        senha = form['senha']
        cursor = con.cursor()
        cursor.execute(f"SELECT * FROM PROJETOSISTEMASWEB.LOGIN WHERE LOGIN = '{usuario}' AND SENHA = '{senha}'")
        result = cursor.fetchall()

        if result:
            session['username'] = usuario
            session['logado'] = True
            return json.dumps([1, "painel"])

    return json.dumps([2, "Erro ao fazer Login!"])


@app.route("/painel")
def painel():
    if (session['logado'] == False):
        return redirect(url_for("hello_world")) #rota index
    else:
        list = []
        with open('data.json', 'r') as f:
            for row in f:
                list.append(json.loads(row))
        return render_template("painel.html", listaArquivo=list)


@app.route("/createUser", methods=["POST"])
def createUser():
    if con.is_connected():
        user = request.json['usuario']
        senha = request.json['senha']
        perfil = request.json['perfil']

        if (perfil == "Gerente"):
            perfil = 3
        elif (perfil == "Supervisor"):
            perfil = 2
        elif (perfil == "Vendedor"):
            perfil = 1
        else:
            return json.dumps([2, "Erro ao validar perfil"])

        cursor = con.cursor();
        cursor.execute(f"INSERT INTO PROJETOSISTEMASWEB.LOGIN(LOGIN,SENHA,PERFIL) VALUES('{user}','{senha}',{perfil})")
        if (cursor.rowcount > 0):
            con.commit()
            cursor.close()
            arquivoJson(user, senha, perfil)
            return json.dumps([1, "Usuário criado com sucesso!"])
    return json.dumps([2, "Erro ao conectar ao banco!"], ensure_ascii=False)


def arquivoJson(user, senha, perfil):
    with open('data.json', 'a') as f:
        json.dump({"user": user, "senha": senha, "perfil": perfil}, f, ensure_ascii=False)
        f.write("\n")


@app.route('/',methods=['get','post'])
def hello_world():  # put application's code here
    session['logado'] = False
    session['username'] = ""
    return render_template("index.html")

if __name__ == '__main__':
    app.run()
