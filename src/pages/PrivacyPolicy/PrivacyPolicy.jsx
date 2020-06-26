import React from "react";
import { injectIntl } from "react-intl";
import { compose } from "recompose";

import pageLayout from "HOC/pageLayout";
import passAuthUser from "HOC/passAuthUser";
import Icon, { ICON_NAMES } from "components/Icon";

const PrivacyPolicy = props => {
  const { intl } = props;
  return (
    <main className="main">
      <section className="about-us">
        <div className="container">
          <div className="data__head">
            <h1 className="section-title">
              {intl.formatMessage({ id: "ui.navigation.privacy_policy" })}
            </h1>
          </div>
          <div className="data__body">
            <div className="row">
              <div className="col-12">
                <div className="data__text">
                  <p className="about-us__text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iusto enim nulla, exercitationem doloribus magnam ipsam
                    aliquid cum dicta harum quisquam praesentium nemo, quis
                    maiores cupiditate dolorem, veniam autem. A ipsum libero
                    blanditiis fuga facere consequatur rerum aliquid deleniti
                    suscipit quaerat possimus cum quas ipsam, distinctio dolorum
                    reprehenderit soluta modi, debitis eius eum quos nulla
                    omnis. Deserunt at amet mollitia est, rerum magnam assumenda
                    atque sequi tempora voluptatum repudiandae ea ipsum
                    recusandae sint, dolorem dolor quasi beatae, quam aliquid
                    molestiae vitae voluptas asperiores quae? Mollitia
                    recusandae qui maiores, nulla iusto, debitis, praesentium
                    nam repudiandae nostrum architecto cupiditate vitae ratione
                    voluptate modi molestiae alias! Sequi doloremque repudiandae
                    nihil quaerat nobis, unde nisi quibusdam ipsum culpa ratione
                    adipisci a odio aspernatur dolorem facere. Culpa, dolore
                    laudantium. Excepturi quia eligendi rem aliquam quam. Velit,
                    maxime itaque quos nesciunt facilis tenetur explicabo
                    dignissimos quia molestiae eum veritatis autem eveniet. Nisi
                    dolor rem sed in hic perferendis nihil quisquam saepe
                    excepturi temporibus quo doloremque a dolorem fugit, eos
                    sunt? Nobis voluptate at ex minus ipsa libero officiis
                    maiores perferendis vero, id dignissimos corporis. Eveniet
                    esse delectus id voluptates a illo soluta nemo hic sint
                    aperiam quia at labore voluptas quae ducimus veritatis,
                    architecto corrupti! Iure, sed perferendis. Aliquam quo
                    eveniet voluptate magni dolorem voluptatibus dolorum alias,
                    assumenda quasi a voluptas nostrum ullam velit ab iste
                    dolore inventore excepturi reprehenderit? Cumque voluptate,
                    obcaecati magnam et tempore, in corporis vel saepe,
                    reprehenderit laboriosam aut alias ratione! Pariatur eveniet
                    distinctio ut necessitatibus similique quibusdam, nesciunt
                    numquam nihil, provident consequuntur impedit, earum eos
                    totam quis adipisci quasi maxime iste qui! Labore, non!
                    Repudiandae esse, sequi reprehenderit numquam nobis,
                    sapiente ut temporibus, eum aliquam dolore dolor pariatur
                    ipsum. Adipisci aliquam eligendi culpa non laborum?
                    Reiciendis eius qui sunt atque provident cum ipsa in placeat
                    eveniet reprehenderit quibusdam nesciunt cumque alias
                    aspernatur quas, amet molestias quam praesentium libero vero
                    consequuntur vel nulla blanditiis. Corporis cumque veniam
                    vitae sapiente sequi esse dignissimos veritatis atque fugiat
                    consequatur pariatur delectus laboriosam necessitatibus
                    voluptatum, distinctio labore molestias, impedit adipisci
                    magni doloribus ratione sit optio odit magnam? In facere
                    veritatis totam ipsa illo quod ducimus eos placeat! Eligendi
                    enim architecto, sequi recusandae blanditiis, fuga neque
                    necessitatibus ea cumque eos ipsum voluptate inventore
                    doloribus in explicabo, quaerat libero labore hic. Sint enim
                    deserunt hic inventore, perspiciatis aliquam doloribus
                    fugiat ad eaque architecto quod molestias magni corrupti ab
                    reiciendis doloremque ratione. Animi iure, sequi similique
                    cum eius recusandae minima, obcaecati corrupti nemo
                    asperiores deleniti rem dignissimos quibusdam impedit harum
                    maxime soluta, magni dolores error voluptatibus architecto!
                    Soluta, ex veniam. Vel deleniti illo voluptas quo dolore
                    aspernatur architecto sit ducimus repudiandae modi velit
                    quaerat a exercitationem ab, possimus perferendis ipsam
                    natus labore quae? Eum sunt doloremque cumque accusantium
                    numquam nostrum delectus quasi eligendi voluptatum magni
                    officia debitis totam quod, accusamus tempora harum.
                    Repellendus fuga tempora quia dolorum, laudantium inventore
                    illum nisi. Iste, itaque excepturi! Nisi tempore, sint culpa
                    ad quasi alias, dolorum consectetur quo natus, libero
                    pariatur quisquam iusto consequatur nostrum! Dolorem, fuga.
                    Eaque commodi quibusdam iure incidunt aut molestias sint
                    minus porro maxime? Quisquam, corrupti repudiandae laborum
                    pariatur fuga hic asperiores, libero minima natus inventore,
                    dolor voluptate veniam cum deserunt saepe optio culpa. Cum
                    quia, corrupti provident nam minima, distinctio est
                    quibusdam illum cumque deleniti excepturi laudantium? Ut
                    accusantium provident reiciendis tempora dolor ab
                    voluptatibus animi veniam? Tenetur est provident reiciendis
                    sunt a quo, maiores quod! Similique voluptatibus
                    perspiciatis, alias sequi commodi non, temporibus quod
                    tempore voluptate ducimus ab? Sed iusto fugit voluptas? Qui
                    rerum magni quam reprehenderit ut aperiam repellat iusto
                    vitae? Labore, officia? Maxime, illo suscipit nesciunt
                    laudantium ullam sint quam. Ea recusandae porro voluptate
                    distinctio natus quaerat praesentium iusto placeat molestias
                    dolore. Est sapiente, ipsum blanditiis quas esse inventore
                    qui laudantium praesentium, aperiam consectetur omnis at
                    vitae impedit incidunt accusantium ducimus optio numquam
                    accusamus quam obcaecati eaque harum a! Ducimus, soluta. Ab
                    eligendi, eveniet molestiae possimus aut, illum tempore, quo
                    reprehenderit perferendis magni rerum ipsa excepturi magnam
                    veritatis voluptas consequatur nemo placeat nulla velit.
                    Labore, aliquam ut molestias deleniti expedita excepturi.
                    Nam temporibus dolorum debitis maiores facilis veritatis
                    quidem iure ad excepturi nesciunt. Quis cum eum tempore
                    reiciendis eos exercitationem architecto, alias quam quas
                    deleniti et optio doloribus saepe aspernatur laboriosam
                    rerum ullam expedita a similique, hic iste corrupti
                    laudantium animi. Odit ea voluptates, eum labore
                    voluptatibus odio unde hic earum perferendis fugiat commodi
                    dolorum nesciunt eius natus! Perferendis iste dolores
                    provident error nisi repellendus laborum, quisquam dolor,
                    voluptates, harum repudiandae laboriosam cum accusamus ad?
                    Aperiam vero dolorum dolores pariatur suscipit quam cum sunt
                    ab ad voluptatum qui nihil laudantium expedita voluptate,
                    consequuntur corrupti in commodi impedit ex. Eos nemo iure
                    consectetur hic eaque animi aliquam doloribus delectus cum
                    magnam accusantium sit enim est quisquam fugiat, soluta
                    saepe. Corrupti veritatis nobis molestias, consectetur,
                    magnam aliquid, iusto perferendis aspernatur suscipit ipsa
                    sapiente necessitatibus. Dolore totam laborum delectus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default compose(injectIntl, passAuthUser, pageLayout())(PrivacyPolicy);
