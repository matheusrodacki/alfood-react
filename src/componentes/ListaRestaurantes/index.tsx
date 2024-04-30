import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');

  useEffect(() => {
    //obter lista de restaurantes
    axios
      .get<IPaginacao<IRestaurante>>(
        'https://sturdy-umbrella-4vvwj6rgrxhq4pp-8000.app.github.dev/api/v1/restaurantes/'
      )
      .then((response) => {
        setRestaurantes(response.data.results);
        const next = response.data.next;
        setProximaPagina(
          next.replace(
            'http://localhost:8000',
            'https://sturdy-umbrella-4vvwj6rgrxhq4pp-8000.app.github.dev'
          )
        );
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  function verMais() {
    axios
      .get<IPaginacao<IRestaurante>>(proximaPagina)
      .then((response) => {
        setRestaurantes([...restaurantes, ...response.data.results]);
        setProximaPagina(response.data.next);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {proximaPagina && <button onClick={verMais}>ver mais</button>}
    </section>
  );
};

export default ListaRestaurantes;
