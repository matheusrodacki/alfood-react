import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios, { AxiosRequestConfig } from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';
import { baseURL } from '../../shared/host';

const ListaRestaurantes = () => {
  interface IParametrosBusca {
    ordering?: string;
    search?: string;
  }

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');
  const [paginaAnterior, setPaginaAnterior] = useState('');
  const [busca, setBusca] = useState('');

  function carregarDados(url: string, opcoes: AxiosRequestConfig = {}) {
    axios
      .get<IPaginacao<IRestaurante>>(url, opcoes)
      .then((resposta) => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
        setPaginaAnterior(resposta.data.previous);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  // a cada busca, montamos um objeto de opções
  function buscar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const opcoes = {
      params: {} as IParametrosBusca,
    };
    if (busca) {
      opcoes.params.search = busca;
    }
    carregarDados(`${baseURL}/api/v1/restaurantes/`, opcoes);
  }

  useEffect(() => {
    // obter restaurantes
    carregarDados(`${baseURL}/api/v1/restaurantes/`);
  }, []);

  // useEffect(() => {
  //   //obter lista de restaurantes
  //   axios
  //     .get<IPaginacao<IRestaurante>>(baseURL + 'api/v1/restaurantes/')
  //     .then((response) => {
  //       setRestaurantes(response.data.results);
  //       setProximaPagina(response.data.next);
  //     })
  //     .catch((erro) => {
  //       console.log(erro);
  //     });
  // }, []);

  // function verMais() {
  //   axios
  //     .get<IPaginacao<IRestaurante>>(proximaPagina)
  //     .then((response) => {
  //       setRestaurantes([...restaurantes, ...response.data.results]);
  //       setProximaPagina(response.data.next);
  //     })
  //     .catch((erro) => {
  //       console.log(erro);
  //     });
  // }

  //   return (
  //     <section className={style.ListaRestaurantes}>
  //       <h1>
  //         Os restaurantes mais <em>bacanas</em>!
  //       </h1>
  //       {restaurantes?.map((item) => (
  //         <Restaurante restaurante={item} key={item.id} />
  //       ))}
  //       {proximaPagina && <button onClick={verMais}>ver mais</button>}
  //     </section>
  //   );
  // };

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      <form onSubmit={buscar}>
        <input
          type='text'
          value={busca}
          onChange={(evento) => setBusca(evento.target.value)}
        />
        <button type='submit'>buscar</button>
      </form>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {
        <button
          onClick={() => carregarDados(paginaAnterior)}
          disabled={!paginaAnterior}>
          Página Anterior
        </button>
      }
      {
        <button
          onClick={() => carregarDados(proximaPagina)}
          disabled={!proximaPagina}>
          Próxima página
        </button>
      }
    </section>
  );
};

export default ListaRestaurantes;
