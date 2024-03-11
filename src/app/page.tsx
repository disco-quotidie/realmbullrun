export default function Home() {
  return (
    <div className="p-12">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        +BULLRUN
      </h1>
      <img src="/Banner.gif" className={"transition-all hover:scale-95 pt-6"} />
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Digital Passport powered by Bitcoin.
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Realm names are self-owned and self-managed directly on the Bitcoin blockchain using the Atomicals Digital Object format — which basically means that there is no middle man or centralized registrar. Once you claim a name, it&apos;s yours forever or until you transfer it to someone else.
      </p>
      <blockquote className="text-2xl text-purple-400 transition-all hover:text-purple-300 mt-6 border-l-2 pl-6 italic">
        The internet-on-bitcoin is not a meme and will be televised.
      </blockquote>

      <p className="pt-4 leading-7 [&:not(:first-child)]:mt-6">
        The Atomicals Bullrun isn&apos;t just a moment; it&apos;s a gateway to explore the groundbreaking technology offered by the Realm Name Service (RNS).
        Here&apos;s what makes the Bullrun special:
      </p>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li className={"transition-all hover:scale-95"}>10,000 Subrealms</li>
        <li className={"transition-all hover:scale-95"}>10,000 NFTs</li>
        <li className={"transition-all hover:scale-95"}>1 Open Source RNS Website</li>
      </ul>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Atomicals Bullrun is your chance to make history in the blockchain community.
        Showcase your digital identity and art collections to a global audience.
        Take it a step further
        by creating subrealms within your realm—tailored for friends, family, or business ventures.
      </p>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        The next generation of sovereignty.
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Every bullrun.subrealm on #Bitcoin holds the superpower to mint any number of names.
        Configure rules based on advanced pattern matching,
        bitwork mining, and even enable payments in satoshis or ARC20 tokens.
        Your digital passport on the Bullrun is not just a record;
        it&apos;s a testament to the potential of decentralized, blockchain-powered identity.
      </p>

      <div className="my-6 w-full overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="m-0 border-t p-0 bg-muted">
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right ">
              </th>
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right ">
                RNS
              </th>
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right ">
                DNS
              </th>
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right ">
                ENS
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="m-0 border-t p-0 ">
              <td className=" border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right ">
                Registration authority
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right transition-all hover:bg-emerald-400">
                Nobody
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right transition-all hover:bg-red-400">
                ICANN DNS Authority
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right transition-all hover:bg-red-400">
                ENS Contracts Devs
              </td>
            </tr>
            <tr className="m-0 border-t p-0">
              <td className=" border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Renewals
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right hover:bg-emerald-400">
                Permanently owned
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right transition-all hover:bg-red-400">
                Yearly renewal + fee
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right transition-all hover:bg-red-400">
                Yearly renewal + fee
              </td>
            </tr>
            <tr className="m-0 border-t p-0 ">
              <td className=" border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right ">
                Blockchain
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right hover:bg-emerald-400">
                Bitcoin
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right transition-all hover:bg-red-400">
                N/A
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right transition-all hover:bg-red-400">
                Ethereum
              </td>
            </tr>
            <tr className="m-0 border-t p-0 ">
              <td className=" border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right ">
                Name identification
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right hover:bg-emerald-400">
                Start with &quot;+&quot;
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right transition-all hover:bg-red-400">
                End suffix ie: .com
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right transition-all hover:bg-red-400">
                End suffix .eth
              </td>
            </tr>
            <tr className="m-0 border-t p-0 ">
              <td className=" border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Name direction
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right hover:bg-emerald-400">
                +name.subname
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right transition-all hover:bg-red-400">
                subname.com
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right transition-all hover:bg-red-400">
                subname.eth
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
}
