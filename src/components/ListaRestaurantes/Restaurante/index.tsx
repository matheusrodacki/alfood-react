import { useEffect, useState } from 'react';
import IRestaurante from '../../../interfaces/IRestaurante';
import Prato from '../Prato';
import estilos from './Restaurante.module.scss';
import IPrato from '../../../interfaces/IPrato';
import http from '../../../http';

interface RestauranteProps {
  restaurante: IRestaurante;
}

const Restaurante = ({ restaurante }: RestauranteProps) => {
  const [pratos, setPratos] = useState<IPrato[]>([]);
  useEffect(() => {
    //obter lista de restaurantes
    http
      .get<IPrato[]>(`v1/restaurantes/${restaurante.id}/pratos/`)
      .then((response) => {
        setPratos(response.data);
        console.log(response);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, [restaurante.id]);

  return (
    <section className={estilos.Restaurante}>
      <div className={estilos.Titulo}>
        <h2>{restaurante.nome}</h2>
      </div>
      <div>
        {pratos?.map((item) => (
          <Prato prato={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};

export default Restaurante;
