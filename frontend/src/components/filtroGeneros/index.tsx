"use client";
import styles from "./styles.module.scss";

interface Genero {
  id: number;
  descricao: string;
}

interface FiltroGenerosProps {
  generos: Genero[];
  selectedGenero: string;
  onGeneroChange: (genero: string) => void;
}

export default function FiltroGeneros({
  generos,
  selectedGenero,
  onGeneroChange,
}: FiltroGenerosProps) {
  return (
    <div className={styles.filtroContainer}>
      <label htmlFor="genero" className={styles.filtroLabel}>
        Filtrar por gênero:
      </label>
      <select   
        id="genero"
        value={selectedGenero}
        onChange={(e) => onGeneroChange(e.target.value)}
        className={styles.filtroSelect}
      >
        <option value="todos">Todos os gêneros</option>
        {generos.map((genero) => (
          <option key={genero.id} value={genero.descricao}>
            {genero.descricao}
          </option>
        ))}
      </select>
    </div>
  );
}
