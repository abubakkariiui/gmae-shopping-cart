import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Loading, Transition } from '../../components';
import { Game } from '../../types/Game.types';
import { Link, useSearchParams } from 'react-router-dom';
import { RiArrowLeftLine } from 'react-icons/ri';
import Grid from './components/Grid';

interface Props {
  games: Game[],
  loadGames: (value: string) => Promise<Game[]>,
  cartItems: Game[];
  addToCart: (game: Game) => void;
}

function GameList(props: Props) {
  const {
    loadGames,
    cartItems,
    addToCart,
  } = props;
  const [games, setGames] = useState(props.games);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchParam = searchParams.get('search') || '';
    setIsLoading(true);
    if (searchParam) {
      (async () => {
        setGames(await loadGames(searchParam));
        setIsLoading(false);
      })();
    } else if (props.games.length) {
      setGames(props.games);
      setIsLoading(false);
    }
  }, [props.games, searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Transition className="GameList" direction="right">
      <nav>
        {searchParams.get('search') && (
          <Transition direction="left">
            <Link to="/games">
              <Button className="Store"><RiArrowLeftLine /> Store</Button>
            </Link>
          </Transition>
        )}
        <motion.h2 layout>
          {searchParams.get('search') || 'Best of All Time'}
        </motion.h2>
      </nav>
      {isLoading
        ? <Loading />
        : <Grid
          games={games}
          cartItems={cartItems}
          addToCart={addToCart}
        />
      }
    </Transition>
  );
}

export default GameList;