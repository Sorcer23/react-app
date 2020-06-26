import React from "react";
import { injectIntl } from "react-intl";
import { compose } from "recompose";

import pageLayout from "HOC/pageLayout";
import passAuthUser from "HOC/passAuthUser";
import Icon, { ICON_NAMES } from "components/Icon";

const TermsConditions = props => {
  const { intl } = props;

  return (
    <main className="main">
      <section className="about-us">
        <div className="container">
          <div className="data__head">
            <h1 className="section-title">
              {intl.formatMessage({ id: "ui.navigation.terms_conditions" })}
            </h1>
          </div>
          <div className="data__body">
            <div className="row">
              <div className="col-12">
                <div className="about-us__text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores quas non, iure delectus, error hic fugit cum doloribus
                  assumenda enim quis sit ratione laudantium repellendus eveniet
                  tenetur, corrupti incidunt labore velit nam voluptates
                  perspiciatis quibusdam itaque! Unde consectetur, fugit soluta
                  nihil laboriosam ipsum amet totam fuga similique nam omnis
                  earum quam, error odit quo distinctio! Magnam saepe alias
                  earum. Repellat optio sit ad suscipit quos ab minima minus
                  numquam, nulla earum. Dolorem, dolores. Quo itaque aliquam,
                  corporis fuga eveniet unde suscipit dolorum dolor, inventore
                  id nisi ipsum quas commodi similique quae, explicabo nesciunt
                  saepe soluta eos. Facere quos assumenda consequuntur vitae
                  praesentium incidunt reiciendis iure libero possimus deserunt,
                  nisi error explicabo molestiae facilis voluptatum numquam
                  inventore enim amet eligendi? Expedita consequuntur nulla
                  aspernatur accusantium natus dicta voluptas dolorem cum,
                  deserunt tenetur laborum tempore rem exercitationem, minima
                  incidunt reprehenderit ipsum? Iste deserunt ratione dolor ea
                  reprehenderit beatae omnis ipsa iure amet laudantium obcaecati
                  architecto, consectetur perspiciatis sit repellendus officiis
                  veniam vitae voluptates provident ullam temporibus. Aliquam ad
                  necessitatibus, velit quas quia cum dolores nostrum quo animi
                  repudiandae doloremque doloribus ut fugiat sint totam mollitia
                  cupiditate corporis ratione dolore. Incidunt doloremque vero
                  temporibus molestias saepe ex consectetur reprehenderit
                  debitis, laborum, quod voluptatum molestiae corporis qui
                  deserunt cupiditate quidem. Hic nam, animi obcaecati
                  accusantium enim quisquam dolorum autem esse, voluptatem
                  facere voluptates corporis non rem reiciendis quae adipisci
                  voluptatibus in dignissimos sint veniam, ducimus similique
                  voluptatum minima! Quasi ab odit laborum fugit, voluptas
                  mollitia exercitationem ad quia atque a non vero tenetur
                  commodi in nihil harum amet beatae soluta labore delectus.
                  Quod, officia. Obcaecati sit consectetur veniam, asperiores
                  earum eum a corporis et eligendi accusamus maxime possimus?
                  Dolores praesentium ipsum animi cum ab facilis atque, laborum
                  rerum sed tempora, beatae voluptatum expedita. Ab corrupti
                  optio consequuntur placeat unde animi minima, officia dolores
                  non ullam doloremque doloribus velit maxime, neque consectetur
                  molestias fugit perferendis vel, voluptatum aliquam sed quia
                  delectus! Nostrum nisi quaerat officia veniam hic ea
                  consectetur soluta voluptates illo! Temporibus tempore
                  molestiae doloremque debitis quas eveniet, iusto nam, ratione
                  cum dolor rem nulla repudiandae id odit praesentium labore
                  voluptatem perferendis placeat cumque porro nobis culpa ipsum
                  itaque! A, totam consequatur amet aspernatur dolor ex
                  laboriosam quod fugiat. Minima cupiditate rerum ratione cum
                  esse incidunt hic reiciendis iusto eveniet quis dignissimos
                  neque eligendi earum harum necessitatibus porro, magni, modi
                  ipsa ea. Quia dicta excepturi placeat itaque ab totam nulla
                  beatae error minima. Unde corporis dolore rerum maxime
                  architecto dolorem possimus minus dicta enim consequatur
                  inventore saepe neque temporibus vel doloremque ullam eum
                  velit fugiat aut accusantium deserunt alias, repudiandae natus
                  aperiam! Alias perspiciatis accusamus sint magnam sunt libero
                  voluptatem, dicta voluptas quia nobis veritatis nihil
                  consequatur officia iure dolore, quis cum natus ut nostrum
                  aliquid distinctio voluptatibus, corporis est? Atque
                  voluptatem illum sunt. Exercitationem quos cumque sapiente
                  necessitatibus voluptatum repellendus dolor eius enim
                  recusandae nulla reprehenderit fugiat ab, fugit harum autem,
                  minus vero voluptas, eum mollitia provident accusantium quam
                  hic! Labore dolores voluptas libero exercitationem nostrum
                  sit, non eos. Debitis nostrum temporibus ullam totam
                  consectetur saepe, obcaecati ducimus eaque placeat voluptates
                  nemo, sequi ipsum, amet quidem. Iure atque dolores architecto
                  quo tempore voluptas libero dicta obcaecati hic similique,
                  error esse laudantium officia explicabo consectetur mollitia.
                  In pariatur velit ex nihil dolor recusandae aliquid tempore
                  harum earum voluptas, nesciunt molestiae. Suscipit nesciunt
                  sint, praesentium ad cupiditate iste quisquam ratione quae
                  accusamus id obcaecati assumenda et sunt numquam saepe
                  repellat fuga aut quos iusto magnam. Quae, velit! Delectus
                  consequuntur explicabo accusantium vero? Facilis aliquid
                  quibusdam delectus assumenda iusto nisi quidem repudiandae
                  deserunt, rem blanditiis ab, a magnam. Tenetur porro harum at
                  mollitia reprehenderit maxime a fuga consectetur repellat
                  temporibus quasi sunt ratione adipisci ipsam ut repellendus
                  ab, accusantium omnis dolorem eligendi necessitatibus eos
                  cupiditate tempora doloremque. Corrupti delectus aut et
                  veritatis, blanditiis molestiae modi! Accusantium aut
                  voluptate qui impedit. Corporis natus repudiandae autem,
                  quidem illo nemo enim velit soluta maiores harum ducimus
                  eveniet odit recusandae quod fugiat obcaecati at, amet unde.
                  Ipsa vero perspiciatis nisi, nihil nesciunt sint cum. Dolorum
                  temporibus dolorem optio distinctio quam quisquam facilis
                  magni quibusdam architecto animi? Eum aliquid odit quidem!
                  Culpa aliquid tempore voluptas debitis cum, distinctio
                  voluptates atque porro iure totam molestias delectus nemo,
                  veritatis aliquam laboriosam nostrum, ratione temporibus
                  repellendus minima? Molestiae voluptatum fuga iusto magni
                  totam tenetur quas natus? Quam commodi quibusdam officiis
                  suscipit delectus exercitationem dolor nobis natus fuga cum
                  obcaecati architecto similique sapiente, omnis voluptas
                  distinctio. Assumenda praesentium dolores eveniet, nemo quidem
                  sunt pariatur unde illo itaque, corrupti ad tenetur, mollitia
                  ducimus consequatur ipsa tempora. Soluta ad, consequuntur aut
                  accusamus omnis facilis pariatur sequi ab earum eligendi sed,
                  nobis labore magni, cupiditate natus numquam accusantium?
                  Molestias esse debitis quis, odio aliquam temporibus in,
                  placeat explicabo quia, blanditiis delectus nesciunt
                  provident. Iste temporibus totam voluptatum, doloribus error
                  fuga quasi a recusandae culpa vero impedit, dolorem
                  perferendis nihil, distinctio similique maxime. Sint autem
                  ipsum at suscipit accusamus provident ipsa neque quod
                  praesentium delectus explicabo, aut dolore illo, impedit
                  itaque? Dolorum fugit placeat accusamus aperiam minima
                  molestiae harum pariatur perspiciatis iure illum, asperiores
                  fugiat atque cumque tenetur illo ullam quod numquam doloribus
                  voluptas maxime animi veritatis tempora. Ea eius consequatur
                  quod quibusdam corporis magni reiciendis? Hic quia natus
                  ipsum. Minus eaque ducimus earum explicabo, enim delectus
                  deleniti sit! Deserunt, vero neque? Aperiam id perferendis
                  amet nesciunt assumenda saepe explicabo reiciendis at ullam.
                  Temporibus iure sed exercitationem doloremque dolore placeat
                  earum quaerat nesciunt nulla quod velit nam ad, perferendis
                  vitae at incidunt. Blanditiis, consequatur odio hic eaque
                  voluptas iste libero nihil dolorum rerum! Nesciunt voluptatem
                  laudantium nulla numquam facilis soluta sequi officia, sit
                  error porro. Corrupti obcaecati dolores magnam cumque quaerat
                  earum dolorum, sequi fugit nobis asperiores laboriosam
                  sapiente, enim aperiam, similique nisi necessitatibus eligendi
                  maxime atque sed architecto numquam. Id consectetur
                  distinctio, recusandae nobis eligendi alias libero dignissimos
                  illum ab qui. Commodi ducimus quod facere ipsam recusandae,
                  atque nesciunt numquam ad ratione qui accusantium sed non quia
                  provident alias debitis, sunt, assumenda omnis. Ea laborum sed
                  fuga eligendi voluptas nam perferendis mollitia molestiae
                  beatae. Assumenda ipsa ut fuga.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default compose(passAuthUser, pageLayout(), injectIntl)(TermsConditions);
