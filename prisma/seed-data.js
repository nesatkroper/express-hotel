const ROLE = [
    {
        name: "admin"
    },
    {
        name: "client"
    },
    {
        name: "management"
    },
    {
        name: "accountant"
    }, {
        name: "sale"
    },
];

const ROOMTYPE = [
    {
        name: "Single Room",
        code: "TYPE-001"
    }, {
        name: "Double Room",
        code: "TYPE-002"
    }, {
        name: "Luxary Room",
        code: "TYPE-003"
    }, {
        name: "Suite Room",
        code: "TYPE-004"
    },
];

const STATE = [
    {
        name: "Banteay Meanchey"
    },
    {
        name: "Battambang"
    },
    {
        name: "Kampong Cham"
    },
    {
        name: "Kampong Chhnang"
    }, {
        name: "Kampong Speu"
    }, {
        name: "Kampong Thom"
    }, {
        name: "Kandal"
    }, {
        name: "Kampot"
    }, {
        name: "Koh Kong"
    }, {
        name: "Kratié"
    }, {
        name: "Mondulkiri"
    }, {
        name: "Phnom Penh"
    }, {
        name: "Prey Veng"
    }, {
        name: "Preah Vihear"
    }, {
        name: "Pursat"
    }, {
        name: "Ratanakiri"
    }, {
        name: "Siem Reap"
    }, {
        name: "Preah Sihanouk"
    }, {
        name: "Stung Treng"
    }, {
        name: "Svay Rieng"
    }, {
        name: "Takéo"
    }, {
        name: "Oddar Meanchey"
    }, {
        name: "Kep"
    }, {
        name: "Pailin"
    }, {
        name: "Tboung Khmum"
    },
];

const CITY = [
    {
        name: "Mongkol Borei",
        stateId: "26c7b135-3592-44ef-af54-7cf228a98989"
    },
    {
        name: "Phnum Srok",
        stateId: "26c7b135-3592-44ef-af54-7cf228a98989"
    },
    {
        name: "Ou Chrov",
        stateId: "26c7b135-3592-44ef-af54-7cf228a98989"
    },
    {
        name: "Serei Saophoan",
        stateId: "26c7b135-3592-44ef-af54-7cf228a98989"
    }, {
        name: "Thma Puok",
        stateId: "26c7b135-3592-44ef-af54-7cf228a98989"
    }, {
        name: "Svay Chek",
        stateId: "26c7b135-3592-44ef-af54-7cf228a98989"
    }, {
        name: "Malai",
        stateId: "26c7b135-3592-44ef-af54-7cf228a98989"
    }, {
        name: "Paoy Paet",
        stateId: "26c7b135-3592-44ef-af54-7cf228a98989"
    }, {
        name: "Banan",
        stateId: "c6836570-7df5-476f-8e59-33632b5ceec0"
    }, {
        name: "Thma Koul",
        stateId: "c6836570-7df5-476f-8e59-33632b5ceec0"
    }, {
        name: "Battambang",
        stateId: "c6836570-7df5-476f-8e59-33632b5ceec0"
    }, {
        name: "Bavel",
        stateId: "c6836570-7df5-476f-8e59-33632b5ceec0"
    }, {
        name: "Aek Phnum",
        stateId: "c6836570-7df5-476f-8e59-33632b5ceec0"
    }, {
        name: "Moung Ruessei",
        stateId: "c6836570-7df5-476f-8e59-33632b5ceec0"
    }, {
        name: "Rotonak Mondol",
        stateId: "c6836570-7df5-476f-8e59-33632b5ceec0"
    }, {
        name: "Sangkae",
        stateId: "c6836570-7df5-476f-8e59-33632b5ceec0"
    }, {
        name: "Samlout",
        stateId: "c6836570-7df5-476f-8e59-33632b5ceec0"
    }, {
        name: "Sampov Lun",
        stateId: "c6836570-7df5-476f-8e59-33632b5ceec0"
    }, {
        name: "Phnum Proek",
        stateId: "c6836570-7df5-476f-8e59-33632b5ceec0"
    }, {
        name: "Kamrieng",
        stateId: "c6836570-7df5-476f-8e59-33632b5ceec0"
    }, {
        name: "Koas Krala",
        stateId: "c6836570-7df5-476f-8e59-33632b5ceec0"
    }, {
        name: "Rukh Kiri",
        stateId: "c6836570-7df5-476f-8e59-33632b5ceec0"
    }, {
        name: "Batheay",
        stateId: "52f0cf8e-8d77-4c8d-87f8-0d1140f7c4e4"
    }, {
        name: "Chamkar Leu",
        stateId: "52f0cf8e-8d77-4c8d-87f8-0d1140f7c4e4"
    }, {
        name: "Cheung Prey",
        stateId: "52f0cf8e-8d77-4c8d-87f8-0d1140f7c4e4"
    }, {
        name: "Kampong Cham",
        stateId: "52f0cf8e-8d77-4c8d-87f8-0d1140f7c4e4"
    }, {
        name: "Kampong Siem",
        stateId: "52f0cf8e-8d77-4c8d-87f8-0d1140f7c4e4"
    }, {
        name: "Kang Meas",
        stateId: "52f0cf8e-8d77-4c8d-87f8-0d1140f7c4e4"
    }, {
        name: "Kaoh Soutin",
        stateId: "52f0cf8e-8d77-4c8d-87f8-0d1140f7c4e4"
    }, {
        name: "Prey Chhor",
        stateId: "52f0cf8e-8d77-4c8d-87f8-0d1140f7c4e4"
    }, {
        name: "Srei Santhor",
        stateId: "52f0cf8e-8d77-4c8d-87f8-0d1140f7c4e4"
    }, {
        name: "Stueng Trang",
        stateId: "52f0cf8e-8d77-4c8d-87f8-0d1140f7c4e4"
    }, {
        name: "Baribour",
        stateId: "c77dc377-0d4e-41eb-89f3-9b18cbf15485"
    }, {
        name: "Chol Kiri",
        stateId: "c77dc377-0d4e-41eb-89f3-9b18cbf15485"
    }, {
        name: "Kampong Chhnang",
        stateId: "c77dc377-0d4e-41eb-89f3-9b18cbf15485"
    }, {
        name: "Kampong Leaeng",
        stateId: "c77dc377-0d4e-41eb-89f3-9b18cbf15485"
    }, {
        name: "Kampong Tralach",
        stateId: "c77dc377-0d4e-41eb-89f3-9b18cbf15485"
    }, {
        name: "Rolea B'ier",
        stateId: "c77dc377-0d4e-41eb-89f3-9b18cbf15485"
    }, {
        name: "Sameakki Mean Chey",
        stateId: "c77dc377-0d4e-41eb-89f3-9b18cbf15485"
    }, {
        name: "Tuek Phos",
        stateId: "c77dc377-0d4e-41eb-89f3-9b18cbf15485"
    }, {
        name: "Basedth",
        stateId: "c0486920-e56b-4f0f-bd30-da0e12b5021b"
    }, {
        name: "Chbar Mon",
        stateId: "c0486920-e56b-4f0f-bd30-da0e12b5021b"
    }, {
        name: "Kong Pisei",
        stateId: "c0486920-e56b-4f0f-bd30-da0e12b5021b"
    }, {
        name: "Aoral",
        stateId: "c0486920-e56b-4f0f-bd30-da0e12b5021b"
    }, {
        name: "Phnum Sruoch",
        stateId: "c0486920-e56b-4f0f-bd30-da0e12b5021b"
    }, {
        name: "Samraong Tong",
        stateId: "c0486920-e56b-4f0f-bd30-da0e12b5021b"
    }, {
        name: "Thpong",
        stateId: "c0486920-e56b-4f0f-bd30-da0e12b5021b"
    }, {
        name: "Odongk Maechay",
        stateId: "c0486920-e56b-4f0f-bd30-da0e12b5021b"
    }, {
        name: "Samkkei Munichay",
        stateId: "c0486920-e56b-4f0f-bd30-da0e12b5021b"
    }, {
        name: "Baray",
        stateId: "58fb865d-f68b-4f14-85d2-26936364c7bb"
    }, {
        name: "Kampong Svay",
        stateId: "58fb865d-f68b-4f14-85d2-26936364c7bb"
    }, {
        name: "Stueng Saen",
        stateId: "58fb865d-f68b-4f14-85d2-26936364c7bb"
    }, {
        name: "Prasat Ballangk",
        stateId: "58fb865d-f68b-4f14-85d2-26936364c7bb"
    }, {
        name: "Prasat Sambour",
        stateId: "58fb865d-f68b-4f14-85d2-26936364c7bb"
    }, {
        name: "Sandan",
        stateId: "58fb865d-f68b-4f14-85d2-26936364c7bb"
    }, {
        name: "Santuk",
        stateId: "58fb865d-f68b-4f14-85d2-26936364c7bb"
    }, {
        name: "Stoung",
        stateId: "58fb865d-f68b-4f14-85d2-26936364c7bb"
    }, {
        name: "Kandal Stueng",
        stateId: "095d006b-9916-4a59-b7a1-fb30da65ff6a"
    }, {
        name: "Kien Svay",
        stateId: "095d006b-9916-4a59-b7a1-fb30da65ff6a"
    }, {
        name: "Khsach Kandal",
        stateId: "095d006b-9916-4a59-b7a1-fb30da65ff6a"
    }, {
        name: "Kaoh Thum",
        stateId: "095d006b-9916-4a59-b7a1-fb30da65ff6a"
    }, {
        name: "Leuk Daek",
        stateId: "095d006b-9916-4a59-b7a1-fb30da65ff6a"
    }, {
        name: "Lvea Aem",
        stateId: "095d006b-9916-4a59-b7a1-fb30da65ff6a"
    }, {
        name: "Mukh Kampul",
        stateId: "095d006b-9916-4a59-b7a1-fb30da65ff6a"
    }, {
        name: "Angk Snuol",
        stateId: "095d006b-9916-4a59-b7a1-fb30da65ff6a"
    }, {
        name: "Ponhea Lueu",
        stateId: "095d006b-9916-4a59-b7a1-fb30da65ff6a"
    }, {
        name: "S'ang",
        stateId: "095d006b-9916-4a59-b7a1-fb30da65ff6a"
    }, {
        name: "Ta Khmau",
        stateId: "095d006b-9916-4a59-b7a1-fb30da65ff6a"
    }, {
        name: "Sampeou Poun",
        stateId: "095d006b-9916-4a59-b7a1-fb30da65ff6a"
    }, {
        name: "Akreiy Ksatr",
        stateId: "095d006b-9916-4a59-b7a1-fb30da65ff6a"
    }, {
        name: "Angkor Chey",
        stateId: "1d95cf77-fd9b-4c36-a6bd-ca2fc5682f0a"
    }, {
        name: "Banteay Meas",
        stateId: "1d95cf77-fd9b-4c36-a6bd-ca2fc5682f0a"
    }, {
        name: "Chhuk",
        stateId: "1d95cf77-fd9b-4c36-a6bd-ca2fc5682f0a"
    }, {
        name: "Chum Kiri",
        stateId: "1d95cf77-fd9b-4c36-a6bd-ca2fc5682f0a"
    }, {
        name: "Dang Tong",
        stateId: "1d95cf77-fd9b-4c36-a6bd-ca2fc5682f0a"
    }, {
        name: "Kampong Trach",
        stateId: "1d95cf77-fd9b-4c36-a6bd-ca2fc5682f0a"
    }, {
        name: "Tuek Chhou",
        stateId: "1d95cf77-fd9b-4c36-a6bd-ca2fc5682f0a"
    }, {
        name: "Kampot",
        stateId: "1d95cf77-fd9b-4c36-a6bd-ca2fc5682f0a"
    }, {
        name: "Bokor",
        stateId: "1d95cf77-fd9b-4c36-a6bd-ca2fc5682f0a"
    }, {
        name: "Botum Sakor",
        stateId: "c435f657-3e07-4760-b447-1e0f3dc327b5"
    }, {
        name: "Kiri Sakor",
        stateId: "c435f657-3e07-4760-b447-1e0f3dc327b5"
    }, {
        name: "Kaoh Kong",
        stateId: "c435f657-3e07-4760-b447-1e0f3dc327b5"
    }, {
        name: "Srae Ambel",
        stateId: "c435f657-3e07-4760-b447-1e0f3dc327b5"
    }, {
        name: "Thma Bang",
        stateId: "c435f657-3e07-4760-b447-1e0f3dc327b5"
    }, {
        name: "Chhloung",
        stateId: "0fc7b952-3058-474c-846b-02ac89cf96a3"
    }, {
        name: "Kracheh",
        stateId: "0fc7b952-3058-474c-846b-02ac89cf96a3"
    }, {
        name: "Prek Prasab",
        stateId: "0fc7b952-3058-474c-846b-02ac89cf96a3"
    }, {
        name: "Sambour",
        stateId: "0fc7b952-3058-474c-846b-02ac89cf96a3"
    }, {
        name: "Snuol",
        stateId: "0fc7b952-3058-474c-846b-02ac89cf96a3"
    }, {
        name: "Chetr Borei",
        stateId: "0fc7b952-3058-474c-846b-02ac89cf96a3"
    }, {
        name: "Ou Krieng Saenchey",
        stateId: "0fc7b952-3058-474c-846b-02ac89cf96a3"
    }, {
        name: "Kaev Seima",
        stateId: "e925a029-35c0-472d-bcc4-f12b4dc93358"
    }, {
        name: "Kaoh Nheaek",
        stateId: "e925a029-35c0-472d-bcc4-f12b4dc93358"
    }, {
        name: "Ou Reang",
        stateId: "e925a029-35c0-472d-bcc4-f12b4dc93358"
    }, {
        name: "Pech Chreada",
        stateId: "e925a029-35c0-472d-bcc4-f12b4dc93358"
    }, {
        name: "Saen Monourom",
        stateId: "e925a029-35c0-472d-bcc4-f12b4dc93358"
    }, {
        name: "Chamkar Mon",
        stateId: "ad4ed6f1-5298-4668-8b4d-b93f9a031afb"
    }, {
        name: "Doun Penh",
        stateId: "ad4ed6f1-5298-4668-8b4d-b93f9a031afb"
    }, {
        name: "Prampir Meakkakra",
        stateId: "ad4ed6f1-5298-4668-8b4d-b93f9a031afb"
    }, {
        name: "Tuol Kouk",
        stateId: "ad4ed6f1-5298-4668-8b4d-b93f9a031afb"
    }, {
        name: "Dangkao",
        stateId: "ad4ed6f1-5298-4668-8b4d-b93f9a031afb"
    }, {
        name: "Mean Chey",
        stateId: "ad4ed6f1-5298-4668-8b4d-b93f9a031afb"
    }, {
        name: "Russey Keo",
        stateId: "ad4ed6f1-5298-4668-8b4d-b93f9a031afb"
    }, {
        name: "Saensokh",
        stateId: "ad4ed6f1-5298-4668-8b4d-b93f9a031afb"
    }, {
        name: "Pur SenChey",
        stateId: "ad4ed6f1-5298-4668-8b4d-b93f9a031afb"
    }, {
        name: "Chrouy Changvar",
        stateId: "ad4ed6f1-5298-4668-8b4d-b93f9a031afb"
    }, {
        name: "Praek Pnov",
        stateId: "ad4ed6f1-5298-4668-8b4d-b93f9a031afb"
    }, {
        name: "Chbar Ampov",
        stateId: "ad4ed6f1-5298-4668-8b4d-b93f9a031afb"
    }, {
        name: "Kamboul",
        stateId: "ad4ed6f1-5298-4668-8b4d-b93f9a031afb"
    }, {
        name: "Ba Phnum",
        stateId: "a1893670-ae29-45dc-a31b-2b2e01d913c0"
    }, {
        name: "Kamchay Mear",
        stateId: "a1893670-ae29-45dc-a31b-2b2e01d913c0"
    }, {
        name: "Kampong Trabaek",
        stateId: "a1893670-ae29-45dc-a31b-2b2e01d913c0"
    }, {
        name: "Kanhchriech",
        stateId: "a1893670-ae29-45dc-a31b-2b2e01d913c0"
    }, {
        name: "Me Sang",
        stateId: "a1893670-ae29-45dc-a31b-2b2e01d913c0"
    }, {
        name: "Peam Chor",
        stateId: "a1893670-ae29-45dc-a31b-2b2e01d913c0"
    }, {
        name: "Peam Ro",
        stateId: "a1893670-ae29-45dc-a31b-2b2e01d913c0"
    }, {
        name: "Pea Reang",
        stateId: "a1893670-ae29-45dc-a31b-2b2e01d913c0"
    }, {
        name: "Preah Sdach",
        stateId: "a1893670-ae29-45dc-a31b-2b2e01d913c0"
    }, {
        name: "Prey Veng",
        stateId: "a1893670-ae29-45dc-a31b-2b2e01d913c0"
    }, {
        name: "Pur Rieng",
        stateId: "a1893670-ae29-45dc-a31b-2b2e01d913c0"
    }, {
        name: "Sithor Kandal",
        stateId: "a1893670-ae29-45dc-a31b-2b2e01d913c0"
    }, {
        name: "Svay Antor",
        stateId: "a1893670-ae29-45dc-a31b-2b2e01d913c0"
    }, {
        name: "Chey Saen",
        stateId: "d6821d1b-0eb4-4075-ae17-de55bd88f46a"
    }, {
        name: "Chhaeb",
        stateId: "d6821d1b-0eb4-4075-ae17-de55bd88f46a"
    }, {
        name: "Choam Ksant",
        stateId: "d6821d1b-0eb4-4075-ae17-de55bd88f46a"
    }, {
        name: "Kuleaen",
        stateId: "d6821d1b-0eb4-4075-ae17-de55bd88f46a"
    }, {
        name: "Rovieng",
        stateId: "d6821d1b-0eb4-4075-ae17-de55bd88f46a"
    }, {
        name: "Sangkum Thmei",
        stateId: "d6821d1b-0eb4-4075-ae17-de55bd88f46a"
    }, {
        name: "Tbaeng Mean Chey",
        stateId: "d6821d1b-0eb4-4075-ae17-de55bd88f46a"
    }, {
        name: "Preah Vihear",
        stateId: "d6821d1b-0eb4-4075-ae17-de55bd88f46a"
    }, {
        name: "Bakan",
        stateId: "e5f07731-54c3-4dfa-919d-4f07885edecc"
    }, {
        name: "Kandieng",
        stateId: "e5f07731-54c3-4dfa-919d-4f07885edecc"
    }, {
        name: "Krakor",
        stateId: "e5f07731-54c3-4dfa-919d-4f07885edecc"
    }, {
        name: "Phnum Kravanh",
        stateId: "e5f07731-54c3-4dfa-919d-4f07885edecc"
    }, {
        name: "Pursat",
        stateId: "e5f07731-54c3-4dfa-919d-4f07885edecc"
    }, {
        name: "Veal Veaeng",
        stateId: "e5f07731-54c3-4dfa-919d-4f07885edecc"
    }, {
        name: "Ta Lou Senchey",
        stateId: "e5f07731-54c3-4dfa-919d-4f07885edecc"
    }, {
        name: "Andoung Meas",
        stateId: "8744628c-739b-47a9-a983-cdb559808f53"
    }, {
        name: "Ban Lung",
        stateId: "8744628c-739b-47a9-a983-cdb559808f53"
    }, {
        name: "Bar Kaev",
        stateId: "8744628c-739b-47a9-a983-cdb559808f53"
    }, {
        name: "Koun Mom",
        stateId: "8744628c-739b-47a9-a983-cdb559808f53"
    }, {
        name: "Lumphat",
        stateId: "8744628c-739b-47a9-a983-cdb559808f53"
    }, {
        name: "Ou Chum",
        stateId: "8744628c-739b-47a9-a983-cdb559808f53"
    }, {
        name: "Ou Ya Dav",
        stateId: "8744628c-739b-47a9-a983-cdb559808f53"
    }, {
        name: "Ta Veaeng",
        stateId: "8744628c-739b-47a9-a983-cdb559808f53"
    }, {
        name: "Veun Sai",
        stateId: "8744628c-739b-47a9-a983-cdb559808f53"
    }, {
        name: "Angkor Chum",
        stateId: "459bdeae-cac3-4c80-b44b-1b569f7b5b36"
    }, {
        name: "Angkor Thum",
        stateId: "459bdeae-cac3-4c80-b44b-1b569f7b5b36"
    }, {
        name: "Banteay Srei",
        stateId: "459bdeae-cac3-4c80-b44b-1b569f7b5b36"
    }, {
        name: "Chi Kraeng",
        stateId: "459bdeae-cac3-4c80-b44b-1b569f7b5b36"
    }, {
        name: "Kralanh",
        stateId: "459bdeae-cac3-4c80-b44b-1b569f7b5b36"
    }, {
        name: "Puok",
        stateId: "459bdeae-cac3-4c80-b44b-1b569f7b5b36"
    }, {
        name: "Prasat Bakong",
        stateId: "459bdeae-cac3-4c80-b44b-1b569f7b5b36"
    }, {
        name: "Siem Reap",
        stateId: "459bdeae-cac3-4c80-b44b-1b569f7b5b36"
    }, {
        name: "Soutr Nikom",
        stateId: "459bdeae-cac3-4c80-b44b-1b569f7b5b36"
    }, {
        name: "Srei Snam",
        stateId: "459bdeae-cac3-4c80-b44b-1b569f7b5b36"
    }, {
        name: "Svay Leu",
        stateId: "459bdeae-cac3-4c80-b44b-1b569f7b5b36"
    }, {
        name: "Varin",
        stateId: "459bdeae-cac3-4c80-b44b-1b569f7b5b36"
    }, {
        name: "Run Ta Aek Techo Sen",
        stateId: "459bdeae-cac3-4c80-b44b-1b569f7b5b36"
    }, {
        name: "Preah Sihanouk",
        stateId: "e6508410-b1cd-4b4a-bb8e-d0da13aaf87c"
    }, {
        name: "Prey Nob",
        stateId: "e6508410-b1cd-4b4a-bb8e-d0da13aaf87c"
    }, {
        name: "Stueng Hav",
        stateId: "e6508410-b1cd-4b4a-bb8e-d0da13aaf87c"
    }, {
        name: "Kampong Seila",
        stateId: "e6508410-b1cd-4b4a-bb8e-d0da13aaf87c"
    }, {
        name: "Kaoh Rung",
        stateId: "e6508410-b1cd-4b4a-bb8e-d0da13aaf87c"
    }, {
        name: "Kampong Soam",
        stateId: "e6508410-b1cd-4b4a-bb8e-d0da13aaf87c"
    }, {
        name: "Sesan",
        stateId: "1497d5be-7923-4709-943a-74a4e1889ddf"
    }, {
        name: "Siem Bouk",
        stateId: "1497d5be-7923-4709-943a-74a4e1889ddf"
    }, {
        name: "Siem Pang",
        stateId: "1497d5be-7923-4709-943a-74a4e1889ddf"
    }, {
        name: "Stueng Traeng",
        stateId: "1497d5be-7923-4709-943a-74a4e1889ddf"
    }, {
        name: "Thala Barivat",
        stateId: "1497d5be-7923-4709-943a-74a4e1889ddf"
    }, {
        name: "Borei Ou Svay Senchey",
        stateId: "1497d5be-7923-4709-943a-74a4e1889ddf"
    }, {
        name: "Chantrea",
        stateId: "32bae6c2-da5e-4131-9336-7a9cc6863b34"
    }, {
        name: "Kampong Rou",
        stateId: "32bae6c2-da5e-4131-9336-7a9cc6863b34"
    }, {
        name: "Rumduol",
        stateId: "32bae6c2-da5e-4131-9336-7a9cc6863b34"
    }, {
        name: "Romeas Haek",
        stateId: "32bae6c2-da5e-4131-9336-7a9cc6863b34"
    }, {
        name: "Svay Chrum",
        stateId: "32bae6c2-da5e-4131-9336-7a9cc6863b34"
    }, {
        name: "Svay Rieng",
        stateId: "32bae6c2-da5e-4131-9336-7a9cc6863b34"
    }, {
        name: "Svay Teab",
        stateId: "32bae6c2-da5e-4131-9336-7a9cc6863b34"
    }, {
        name: "Bavet",
        stateId: "32bae6c2-da5e-4131-9336-7a9cc6863b34"
    }, {
        name: "Angkor Borei",
        stateId: "5bde7df9-014f-4ef6-ba0e-e80b797632ec"
    }, {
        name: "Bati",
        stateId: "5bde7df9-014f-4ef6-ba0e-e80b797632ec"
    }, {
        name: "Borei Cholsar",
        stateId: "5bde7df9-014f-4ef6-ba0e-e80b797632ec"
    }, {
        name: "Kiri Vong",
        stateId: "5bde7df9-014f-4ef6-ba0e-e80b797632ec"
    }, {
        name: "Kaoh Andaet",
        stateId: "5bde7df9-014f-4ef6-ba0e-e80b797632ec"
    }, {
        name: "Prey Kabbas",
        stateId: "5bde7df9-014f-4ef6-ba0e-e80b797632ec"
    }, {
        name: "Samraong",
        stateId: "5bde7df9-014f-4ef6-ba0e-e80b797632ec"
    }, {
        name: "Doun Kaev",
        stateId: "5bde7df9-014f-4ef6-ba0e-e80b797632ec"
    }, {
        name: "Tram Kak",
        stateId: "5bde7df9-014f-4ef6-ba0e-e80b797632ec"
    }, {
        name: "Treang",
        stateId: "5bde7df9-014f-4ef6-ba0e-e80b797632ec"
    }, {
        name: "Anlong Veaeng",
        stateId: "dd59606a-6b67-4950-8b23-a8f59bbab31d"
    }, {
        name: "Banteay Ampil",
        stateId: "dd59606a-6b67-4950-8b23-a8f59bbab31d"
    }, {
        name: "Chong Kal",
        stateId: "dd59606a-6b67-4950-8b23-a8f59bbab31d"
    }, {
        name: "Samraong",
        stateId: "dd59606a-6b67-4950-8b23-a8f59bbab31d"
    }, {
        name: "Trapeang Prasat",
        stateId: "dd59606a-6b67-4950-8b23-a8f59bbab31d"
    }, {
        name: "Damnak Chang'aeur",
        stateId: "1e5cc254-b16b-4fe9-8171-a0738ca357c3"
    }, {
        name: "Kaeb",
        stateId: "1e5cc254-b16b-4fe9-8171-a0738ca357c3"
    }, {
        name: "Pailin",
        stateId: "634954c1-2196-426c-8ec2-458737a64565"
    }, {
        name: "Sala Krau",
        stateId: "634954c1-2196-426c-8ec2-458737a64565"
    }, {
        name: "Dambae",
        stateId: "a90b71a0-934b-4f20-a331-2f9c16df1fc8"
    }, {
        name: "Krouch Chhmar",
        stateId: "a90b71a0-934b-4f20-a331-2f9c16df1fc8"
    }, {
        name: "Memot",
        stateId: "a90b71a0-934b-4f20-a331-2f9c16df1fc8"
    }, {
        name: "Ou Reang Ov",
        stateId: "a90b71a0-934b-4f20-a331-2f9c16df1fc8"
    }, {
        name: "Ponhea Kraek",
        stateId: "a90b71a0-934b-4f20-a331-2f9c16df1fc8"
    }, {
        name: "Suong",
        stateId: "a90b71a0-934b-4f20-a331-2f9c16df1fc8"
    }, {
        name: "Tboung Khmum",
        stateId: "a90b71a0-934b-4f20-a331-2f9c16df1fc8"
    },
];

module.exports = {
    ROOMTYPE,
    ROLE,
    STATE,
    CITY
};
