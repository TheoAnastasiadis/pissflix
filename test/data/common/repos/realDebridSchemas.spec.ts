import { getTorrentInfoResponse } from "../../../../src/data/common/repos/helpers/realDebridSchemas"
import * as E from 'fp-ts/Either'

const validInfoResponse =  {
    id: '6JNLL63SUEL5G',
    filename: 'The.Last.of.Us.S01E04.Please.Hold.on.to.My.Hand.1080p.HMAX.WEB-DL.DDP5.1.Atmos.H.264-SMURF.mkv',
    original_filename: 'The.Last.of.Us.S01E04.1080p.HMAX.WEBRip.DDP5.1.Atmos.x264-SMURF[TGx]',
    hash: '331b74f12a1ce8d00f0f8be0844f5cc6471c925e',
    bytes: 3051296580,
    original_bytes: 3051297473,
    host: 'real-debrid.com',
    split: 2000,
    progress: 100,
    status: 'downloaded',
    added: '2023-05-26T15:34:24.000Z',
    files: [
      {
        id: 1,
        path: '/NEW upcoming releases by Xclusive.txt',       
        bytes: 175,
        selected: 0
      },
      {
        id: 2,
        path: '/The.Last.of.Us.S01E04.Please.Hold.on.to.My.Hand.1080p.HMAX.WEB-DL.DDP5.1.Atmos.H.264-SMURF.mkv',
        bytes: 3051296580,
        selected: 1
      },
      {
        id: 3,
        path: '/[TGx]Downloaded from torrentgalaxy.to .txt',  
        bytes: 718,
        selected: 0
      }
    ],
    links: [ 'https://real-debrid.com/d/EUPWINYVVUXMM' ],     
    ended: '2023-02-06T03:35:37.000Z'
  }

describe("Real Debrid Schemas", () => {
  test("getTorrentInfoResponse", () => {
    const parsed = getTorrentInfoResponse.decode(validInfoResponse)
    expect(E.isRight(parsed)).toBeTruthy
  })
})
