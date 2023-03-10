import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiGlobalLine,
  RiWindowsFill,
  RiAndroidFill,
  RiPlaystationFill,
  RiXboxFill,
  RiAppleFill,
  RiAddLine,
  RiCheckLine,
} from 'react-icons/ri';
import {
  SiIos,
  SiLinux,
  SiNintendoswitch,
} from 'react-icons/si';
import { Transition, Button } from '../../../components';
import { Game } from '../../../types/Game.types';

interface Props {
  game: Game;
  cartItems: Game[];
  addToCart: (game: Game) => void;
}

const platformIcons: Record<string, React.ReactNode> = {
  web: <RiGlobalLine />,
  pc: <RiWindowsFill />,
  android: <RiAndroidFill />,
  ios: <SiIos />,
  playstation: <RiPlaystationFill />,
  xbox: <RiXboxFill />,
  mac: <RiAppleFill />,
  linux: <SiLinux />,
  nintendo: <SiNintendoswitch />,
};

function GameCard(props: Props) {
  const {
    game,
    cartItems,
    addToCart,
  } = props;
  const {
    id,
    name,
    price,
    released,
    background_image,
    parent_platforms,
    genres,
  } = game;
  const releasedDate = new Date(released).toLocaleDateString();
  const genreList = genres.map(({ name }) => name).join(', ');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="GameCard">
      <motion.div
        className="Image"
        whileHover={{ height: 180 }}
        style={{ backgroundImage: `url(${background_image})` }}
      />
      <motion.div
        className="Info"
        whileHover={{ height: 180 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="Price">
          {cartItems.find((item) => item.id === id)
            ? <Transition className="Added">Added <RiCheckLine /></Transition>
            : <Button handleClick={() => addToCart(game)}>
              Add to cart <RiAddLine />
            </Button>
          }
          ${price}
        </div>
        <Button className="Name">{name}</Button>
        <AnimatePresence>
          {isHovered && (
            <Transition className="MoreInfo">
              {parent_platforms && <div className="Platforms">
                {parent_platforms.map(({ platform }) => (
                  <div key={`${platform.id}-${id}`} title={platform.name}>
                    {platformIcons[platform.slug]}
                  </div>
                ))}
              </div>}
              <div className="Released">Released: {releasedDate}</div>
              <div className="Genres">Genres: {genreList}</div>
            </Transition>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default GameCard;
